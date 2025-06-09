// apps/api/src/queues/reservationQueue.ts
import { Queue } from 'bullmq';
import { env } from '@/env';

// opțional: dacă ai extras conexiunea Redis într-un util separat,
// importă de acolo în loc să duplici detaliile
export const reservationQueue = new Queue('sendReservationEmail', {
  connection: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
    password: env.REDIS_PASSWORD, // poate rămâne undefined
  },
  // retry policy implicită (poți ajusta):
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5_000, // 5 secunde, apoi 10 sec, etc.
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
