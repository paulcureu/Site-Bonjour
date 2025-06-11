// @ts-expect-error: dotenv might not have type definitions, or its types conflict with other dependencies.
import dotenv from 'dotenv';
dotenv.config();

console.log('🚀 Script a pornit'); // <- trebuie să apară

import { reservationQueue } from '../src/queues/reservationQueue';

async function main() {
  await reservationQueue.add('sendReservationEmail', {
    name: 'Ion Popescu',
    email: 'ion@example.com',
    date: '2025-06-10',
    time: '19:30',
    guests: 4,
  });

  console.log('✅ Job adăugat în coadă!');
}

main().catch(err => {
  console.error('❌ Eroare la trimiterea jobului:', err);
});
