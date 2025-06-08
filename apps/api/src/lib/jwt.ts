import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const accessSecret = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

const accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as SignOptions['expiresIn'];
const refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'];
const resetSecret = process.env.JWT_RESET_SECRET || 'default_reset_secret';
const resetExpiresIn: SignOptions['expiresIn'] = '30m';

export function signAccessToken(payload: object): string {
  return jwt.sign(payload, accessSecret, { expiresIn: accessExpiresIn });
}

export function signRefreshToken(payload: object): string {
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiresIn });
}

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, accessSecret);
  if (typeof decoded === 'string') throw new Error('Invalid access token');
  return decoded;
}

export function verifyRefreshToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, refreshSecret);
  if (typeof decoded === 'string') throw new Error('Invalid refresh token');
  return decoded;
}

export function signResetToken(payload: object): string {
  return jwt.sign(payload, resetSecret, { expiresIn: resetExpiresIn });
}

export function verifyResetToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, resetSecret);
  if (typeof decoded === 'string') throw new Error('Invalid reset token');
  return decoded;
}
