// apps/api/src/middlewares/isAdmin.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../lib/jwt';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const auth = req.headers.authorization;

  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing token' });
    return;
  }

  try {
    const token = auth.split(' ')[1];
    const payload = verifyAccessToken(token) as {
      sub: string;
      email: string;
      role?: string;
    };

    if ((payload.role ?? '').toUpperCase() !== 'ADMIN') {
      res.status(403).json({ message: 'Access denied: Admins only' });
      return;
    }

    (req as any).user = payload; // optional: expose user to downstream handlers
    next();
  } catch (err) {
    console.error('[isAdmin] JWT error', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
