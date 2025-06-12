import { Worker, Job } from 'bullmq';
import { sendReservationEmail } from '../lib/email';
import { env } from '../env';
// Importăm ioredis
import IORedis from 'ioredis';

// Interfața datelor din job
interface ReservationJobData {
  recipientEmail: string;
  name: string;
}

// Funcția care procesează job-ul
const processReservationJob = async (job: Job<ReservationJobData>) => {
  console.log(`[Worker] Procesare job #${job.id}.`);
  const { recipientEmail, name } = job.data;
  if (!recipientEmail) {
    throw new Error(`[Worker] Job #${job.id} nu are un destinatar valid.`);
  }
  await sendReservationEmail(recipientEmail, name);
};

// --- CORECȚIE: Creăm o instanță IORedis pentru conexiune ---
const connection = new IORedis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, // O opțiune recomandată de BullMQ
});

// Creăm worker-ul și îi dăm instanța de conexiune
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
