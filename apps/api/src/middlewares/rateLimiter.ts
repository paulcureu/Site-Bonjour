// apps/api/src/middlewares/rateLimiter.ts
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redis } from '../lib/redis';

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 100,
  duration: 600,
});

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).json({ message: 'Too Many Requests' });
  }
};

export { rateLimiterMiddleware as rateLimiter };
