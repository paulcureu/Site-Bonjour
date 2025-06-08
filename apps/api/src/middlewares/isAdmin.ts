import { RequestHandler } from 'express';
import { verifyAccessToken } from '../lib/jwt';

export const isAdmin: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing access token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);

    if (payload.role !== 'admin') {
      res.status(403).json({ message: 'Access denied: Admins only' });
      return;
    }

    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired access token' });
  }
};
