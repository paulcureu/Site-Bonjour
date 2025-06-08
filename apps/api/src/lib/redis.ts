import { createClient } from 'redis';

const url = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = createClient({ url });

redis.on('error', (err) => {
  console.error('[redis] connection error', err);
});

redis.connect().catch((err) => {
  console.error('[redis] connect failed', err);
});
