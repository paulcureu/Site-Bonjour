// src/controllers/authController.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { comparePasswords } from '../utils/hash';
import { signAccessToken, signRefreshToken } from '../lib/jwt';

export async function loginHandler(req: Request, res: Response): Promise<void> {
  console.log('[LOGIN] Request received');

  const { email, password } = req.body;

  if (!email || !password) {
    console.log('[LOGIN] Missing email or password');
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    console.log('[LOGIN] User not found');
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const valid = await comparePasswords(password, user.password);
  if (!valid) {
    console.log('[LOGIN] Invalid password');
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const payload = { sub: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  console.log('[LOGIN] Login successful');

  res.json({ accessToken, refreshToken });
}
