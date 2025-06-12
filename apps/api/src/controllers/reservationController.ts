import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { createReservationSchema, updateReservationSchema } from '../validation';
import { reservationQueue } from '../queues/reservationQueue';

// Definim un tip explicit pentru handler-ele noastre Express
type ExpressHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * GET /api/v1/reservations
 */
export const getAllReservations: ExpressHandler = async (_req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/reservations
 */
export const createReservation: ExpressHandler = async (req, res, next) => {
  try {
    const parsed = createReservationSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: 'Date invalide.',
        errors: parsed.error.flatten(),
      });
      // Folosim return; pentru a ne asigura că execuția se oprește aici, fără a returna o valoare
      return;
    }

    const d = parsed.data;
    const reservationDateTime = new Date(`${d.date}T${d.time}:00`);

    const reservation = await prisma.reservation.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone,
        date: reservationDateTime,
        people: d.guests,
        notes: d.notes,
      },
    });

    await reservationQueue.add('sendConfirmationEmail', {
      reservationId: reservation.id,
      recipientEmail: reservation.email,
      name: reservation.name,
    });

    res.status(201).json(reservation);
  } catch (err) {
    console.error('EROARE LA CREAREA REZERVĂRII:', err);
    next(err);
  }
};

/**
 * PUT /api/v1/reservations/:id
 */
export const updateReservation: ExpressHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsed = updateReservationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: 'Date invalide.', errors: parsed.error.flatten() });
      // Folosim return; pentru a ne asigura că execuția se oprește aici, fără a returna o valoare
      return;
    }

    const d = parsed.data;
    const reservationDateTime = d.date && d.time ? new Date(`${d.date}T${d.time}:00`) : undefined;

    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        ...(d.name && { name: d.name }),
        ...(d.email && { email: d.email }),
        ...(d.phone && { phone: d.phone }),
        ...(reservationDateTime && { date: reservationDateTime }),
        ...(d.guests && { people: d.guests }),
        ...(d.notes && { notes: d.notes }),
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/v1/reservations/:id
 */
export const deleteReservation: ExpressHandler = async (req, res, next) => {
  try {
    await prisma.reservation.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
