import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { createReviewSchema, updateReviewSchema } from '../validation';

export const getAllReviews = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  const parsed = createReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }

  try {
    const d = parsed.data;
    const review = await prisma.review.create({
      data: {
        rating: d.rating,
        comment: d.comment,
        menuItemId: d.menuItemId,
        userId: d.userId, // ✅ folosești userId din body
      },
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  const parsed = updateReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const d = parsed.data;
    const updated = await prisma.review.update({
      where: { id },
      data: {
        ...(d.rating && { rating: d.rating }),
        ...(d.comment && { comment: d.comment }),
        ...(d.menuItemId && { menuItemId: d.menuItemId }),
        ...(d.userId && { userId: d.userId }), // ← dacă permiți update de user
      },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await prisma.review.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
