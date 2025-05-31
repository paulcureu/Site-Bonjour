import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = req.user;

  if (!user || user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Access denied. Admins only.' });
    return; // 👈 important să pui `return` aici fără să returnezi Response
  }

  next();
}
