import { Worker, Job } from 'bullmq';
import { sendReservationEmail } from '../lib/email';
import { env } from '../env';
import IORedis from 'ioredis';

interface ReservationJobData {
  recipientEmail: string;
  name: string;
}

const processReservationJob = async (job: Job<ReservationJobData>) => {
  console.log(`[Worker] Procesare job #${job.id}.`);
  const { recipientEmail, name } = job.data;
  if (!recipientEmail) {
    throw new Error(`[Worker] Job #${job.id} nu are un destinatar valid.`);
  }
  await sendReservationEmail(recipientEmail, name);
};

const connection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const reservationWorker = new Worker<ReservationJobData>(
  'sendReservationEmail',
  processReservationJob,
  {
    connection: connection,
    concurrency: 5,
  },
);

console.log('✅ Worker-ul pentru rezervări a pornit și ascultă coada.');

reservationWorker.on('failed', (job, err) => {
  console.error(`[Worker] Job-ul #${job?.id} a eșuat cu eroarea: ${err.message}`);
});
