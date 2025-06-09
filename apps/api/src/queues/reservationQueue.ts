import { Queue } from 'bullmq';

export const reservationQueue = new Queue('sendReservationEmail', {
  connection: {
    url: process.env.REDIS_URL!,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5_000, // 5 secunde, apoi 10, etc.
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
