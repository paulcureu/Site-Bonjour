import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { comparePasswords } from '../utils/hash';
import { signAccessToken, signRefreshToken } from '../lib/jwt';

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
