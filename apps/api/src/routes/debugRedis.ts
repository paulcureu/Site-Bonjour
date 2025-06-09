import { Router } from 'express';
import Redis from 'ioredis';

const router = Router();

const redis = new Redis(process.env.REDIS_URL!);

router.get('/debug/redis', async (req, res) => {
  try {
    await redis.set('debug:test', 'ok', 'EX', 60);
    const value = await redis.get('debug:test');
    res.json({ status: 'connected', value });
  } catch (err) {
    console.error('❌ Redis connection error:', err);
    res.status(500).json({ error: 'Redis connection failed', message: err.message });
  }
});

export default router;
