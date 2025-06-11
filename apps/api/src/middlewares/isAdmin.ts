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

    // Decode & narrow the JWT payload
    const payload = verifyAccessToken(token) as {
      sub: string;
      email: string;
      role?: string; // <- optional here
    };

    // Reject if role isn’t ADMIN
    if ((payload.role ?? '').toUpperCase() !== 'ADMIN') {
      res.status(403).json({ message: 'Access denied: Admins only' });
      return;
    }

    // Expose the user downstream (now matches the augmented type below)
    req.user = payload;
    next();
  } catch (err) {
    console.error('[isAdmin] JWT error', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
