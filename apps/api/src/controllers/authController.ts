import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { comparePasswords } from '../utils/hash';
import { signAccessToken, signRefreshToken } from '../lib/jwt';
import jwt from 'jsonwebtoken';

export async function loginHandler(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const payload = { sub: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.json({ accessToken, refreshToken });
}

export function refreshHandler(req: Request, res: Response): void {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Missing refresh token' });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    const newAccessToken = signAccessToken({
      sub: (payload as any).sub,
      email: (payload as any).email,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
}
