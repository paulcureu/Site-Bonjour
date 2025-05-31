/// <reference path="../src/types/express/index.d.ts" />

import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { isAdmin } from '../src/middlewares/isAdmin';

const app = express();

// Middleware care simulează autentificarea și injectează `req.user`
const setUser = (user: any) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    req.user = user;
    next();
  };
};

// Rute de test protejate cu middleware-ul isAdmin
app.get(
  '/admin',
  setUser({ id: '1', email: 'admin@example.com', role: 'ADMIN' }),
  isAdmin,
  (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
  },
);

app.get(
  '/public',
  setUser({ id: '2', email: 'user@example.com', role: 'PUBLIC' }),
  isAdmin,
  (req, res) => {
    res.status(200).json({ message: 'Should not see this' });
  },
);

// Testele propriu-zise
describe('isAdmin middleware', () => {
  it('✅ should allow access for ADMIN user', async () => {
    const res = await request(app).get('/admin');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Welcome, Admin!');
  });

  it('❌ should deny access for PUBLIC user', async () => {
    const res = await request(app).get('/public');
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Access denied. Admins only.');
  });
});
