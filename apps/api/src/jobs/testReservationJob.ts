import { Queue } from 'bullmq';
import { env } from '../env';

const queue = new Queue('sendReservationEmail', {
  connection: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
    password: env.REDIS_PASSWORD,
  },
});

async function main() {
  await queue.add('send-reservation', {
    email: 'you@example.com',
    name: 'Paul',
    date: '2025-06-10',
    time: '19:00',
    guests: 2,
  });

  console.log('✅ Job de test adăugat în coadă.');
  await queue.close();
}

main();
