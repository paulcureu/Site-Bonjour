/**
 * Extends Express.Request so `req.user` is available everywhere,
 * with `role` OPTIONAL to match what the JWT might actually deliver.
 */
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        email: string;
        role?: string; // <- optional
      };
    }
  }
}

export {}; // makes this a module
