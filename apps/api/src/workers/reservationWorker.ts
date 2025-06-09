import dotenv from 'dotenv';
dotenv.config(); // încarcă .env

import { Worker } from 'bullmq';
import { sendReservationEmail } from '../lib/email';

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

    await sendReservationEmail(data.email, data.name, data.date, data.time, data.guests);
  },
  {
    connection: {
      url: process.env.REDIS_URL!,
    },
  },
);

reservationWorker.on('completed', job => {
  console.log(`✅ Job ${job.id} procesat cu succes`);
});

reservationWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} a eșuat:`, err);
});
