import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { comparePasswords } from '../utils/hash';
import { signAccessToken, signRefreshToken } from '../lib/jwt';
import jwt from 'jsonwebtoken';
import { env } from '../env';
import bcrypt from 'bcryptjs';

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

export async function requestPasswordResetHandler(req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const user = await prisma.adminUser.findUnique({
    where: { email },
  });

  // Mereu returnăm 200 OK – nu dezvăluim dacă userul există sau nu
  if (!user) {
    res.status(200).json({
      message: 'Dacă emailul există, vei primi un link de resetare.',
    });
    return;
  }

  // Generăm JWT cu expirație de 30 minute
  const token = jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: '30m' });

  // 🔔 Log în consolă (în loc de trimitere email pentru început)
  console.log(`🔐 Link resetare: http://localhost:5173/reset-password?token=${token}`);

  res.status(200).json({
    message: 'Dacă emailul există, vei primi un link de resetare.',
  });
}

export async function resetPasswordHandler(req: Request, res: Response): Promise<void> {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ error: 'Token și parolă nouă sunt obligatorii.' });
    return;
  }

  try {
    // Decodăm tokenul JWT
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string; email: string };

    // Hash-uim parola nouă
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Salvăm parola nouă în DB
    await prisma.adminUser.update({
      where: { id: payload.sub },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Parola a fost resetată cu succes.' });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Token invalid sau expirat.' });
  }
}
