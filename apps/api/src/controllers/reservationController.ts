// apps/api/src/controllers/reservationController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { createReservationSchema, updateReservationSchema } from '@shared/validation';

/**
 * GET /api/v1/reservations
 */
export const getAllReservations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations); // ⇒ void
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/reservations
 */
export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  const parsed = createReservationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }

  try {
    const d = parsed.data;
    const reservation = await prisma.reservation.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone,
        date: new Date(d.date),
        people: d.guests, // mapăm guests → people
        notes: d.notes,
      },
    });

    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/v1/reservations/:id
 */
export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const parsed = updateReservationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }

  try {
    const d = parsed.data;
    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        ...(d.name && { name: d.name }),
        ...(d.email && { email: d.email }),
        ...(d.phone && { phone: d.phone }),
        ...(d.date && { date: new Date(d.date) }),
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
export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.reservation.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
