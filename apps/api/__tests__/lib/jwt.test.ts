import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../../src/lib/jwt';

describe('jwt utils', () => {
  const payload = { sub: '123', email: 'test@example.com' };

  it('should sign and verify access token', () => {
    const token = signAccessToken(payload);
    const decoded = verifyAccessToken(token);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.sub).toBe(payload.sub);
  });

  it('should sign and verify refresh token', () => {
    const token = signRefreshToken(payload);
    const decoded = verifyRefreshToken(token);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.sub).toBe(payload.sub);
  });

  it('should throw when verifying an invalid token', () => {
    const accessToken = signAccessToken(payload);
    const tamperedAccess = accessToken.slice(0, -1) +
      (accessToken.slice(-1) === 'a' ? 'b' : 'a');
    expect(() => verifyAccessToken(tamperedAccess)).toThrow();
    expect(() => verifyAccessToken('invalid.token')).toThrow();

    const refreshToken = signRefreshToken(payload);
    const tamperedRefresh = refreshToken.slice(0, -1) +
      (refreshToken.slice(-1) === 'a' ? 'b' : 'a');
    expect(() => verifyRefreshToken(tamperedRefresh)).toThrow();
    expect(() => verifyRefreshToken('invalid.token')).toThrow();
  });
});
