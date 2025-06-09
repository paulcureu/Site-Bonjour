import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
});

(async () => {
  try {
    await client.connect();
    console.log('✅ Connected to Redis');
    await client.set('test', '123');
    const value = await client.get('test');
    console.log('📦 Test value:', value);
    await client.disconnect();
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
})();
