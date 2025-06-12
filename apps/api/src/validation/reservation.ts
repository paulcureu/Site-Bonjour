// packages/validation/src/reservation.ts
import { z } from 'zod';

// reservation.ts
export const createReservationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  time: z.string(), // păstrează dacă ai în UI separat
  guests: z.number().int().positive().max(20),
  notes: z.string().optional(),
});

export const updateReservationSchema = createReservationSchema.partial();
