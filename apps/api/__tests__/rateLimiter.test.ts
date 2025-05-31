import request from 'supertest';
import express from 'express';
import { rateLimiter } from '../src/middlewares/rateLimiter';

const app = express();
app.use(rateLimiter);
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

describe('🔒 Rate Limiter Middleware', () => {
  it('🧪 allows up to 100 requests and blocks the 101st with 429', async () => {
    for (let i = 0; i < 100; i++) {
      const res = await request(app).get('/test').set('X-Forwarded-For', '1.2.3.4');
      expect(res.status).toBe(200);
    }

    const res = await request(app).get('/test').set('X-Forwarded-For', '1.2.3.4');
    expect(res.status).toBe(429);
    expect(res.body).toEqual({
      status: 429,
      error: 'Too many requests. Please try again later.',
    });
  });
});
