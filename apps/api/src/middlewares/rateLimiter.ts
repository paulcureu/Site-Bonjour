// src/middlewares/rateLimiter.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '../redis';
import type { RedisReply } from 'rate-limit-redis';

export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests. Please try again later.',
  },
  store: new RedisStore({
    sendCommand: (...args: [string, ...(string | number)[]]): Promise<RedisReply> => {
      return redis.call(...(args as [string, ...any[]])) as Promise<RedisReply>;
    },
  }),
});
