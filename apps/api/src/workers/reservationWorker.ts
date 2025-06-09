import dotenv from 'dotenv';
dotenv.config(); // încarcă .env

import { Worker } from 'bullmq';
import { env } from '../env';

// 👇 definim worker-ul
const reservationWorker = new Worker(
  'sendReservationEmail',
  async job => {
    const data = job.data;

    console.log('📨 Procesăm rezervarea...');
    console.log('👤 Nume:', data.name);
    console.log('📧 Email:', data.email);
    console.log('📅 Data:', data.date);
    console.log('⏰ Ora:', data.time);
    console.log('👥 Nr persoane:', data.guests);

    // ✉️ Aici poți adăuga logica de trimitere email (ex: cu nodemailer)
  },
  {
    connection: {
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
      password: env.REDIS_PASSWORD,
    },
  },
);

reservationWorker.on('completed', job => {
  console.log(`✅ Job ${job.id} procesat cu succes`);
});

reservationWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} a eșuat:`, err);
});
