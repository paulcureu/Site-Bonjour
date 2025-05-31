// apps/api/src/lib/jwt.ts
import jwt, { SignOptions } from 'jsonwebtoken';

const accessSecret = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

const accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as SignOptions['expiresIn'];
const refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

export function signAccessToken(payload: object): string {
  return jwt.sign(payload, accessSecret, { expiresIn: accessExpiresIn });
}

export function signRefreshToken(payload: object): string {
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiresIn });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessSecret);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret);
}
