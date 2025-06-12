// apps/api/src/jobs/testReservationJob.ts

import { Queue } from 'bullmq';
import { env } from '../env';
import IORedis from 'ioredis';

const connection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const testQueue = new Queue('sendReservationEmail', {
  connection: connection,
});

async function addTestJob() {
  try {
    console.log('Adăugare job de test în coadă...');
    await testQueue.add('sendConfirmationEmail', {
      recipientEmail: 'test@example.com',
      name: 'Client Test',
      reservationId: 'test-12345',
    });
    console.log('✅ Job de test adăugat cu succes.');
  } catch (error) {
    console.error('❌ Eroare la adăugarea job-ului de test:', error);
  } finally {
    await testQueue.close();
    await connection.quit();
  }
}

addTestJob();
