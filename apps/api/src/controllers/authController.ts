// apps/api/src/controllers/authController.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { comparePasswords } from '../utils/hash';
import { signAccessToken, signRefreshToken } from '../lib/jwt';
import jwt from 'jsonwebtoken';

/* ------------------------------------------------------------------ */
/*  POST /api/v1/auth/login                                           */
/* ------------------------------------------------------------------ */
export async function loginHandler(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  /* lookup user (model name is `user`, NOT `adminUser`) */
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  /* include `role` so middleware can enforce RBAC */
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role, // "ADMIN" or "CUSTOMER"
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.json({ accessToken, refreshToken });
}

/* ------------------------------------------------------------------ */
/*  POST /api/v1/auth/refresh                                          */
/* ------------------------------------------------------------------ */
export function refreshHandler(req: Request, res: Response): void {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Missing refresh token' });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as {
      sub: string;
      email: string;
      role: string;
    };

    /* issue a new access token with the same role */
    const newAccessToken = signAccessToken({
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    });

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
}
