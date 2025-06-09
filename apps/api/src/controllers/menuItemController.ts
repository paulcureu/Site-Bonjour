import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const getAllMenuItems = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await prisma.menuItem.findMany();
    res.json(items);
  } catch (err) {
    next(err);
  }
};
