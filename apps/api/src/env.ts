import envSchema from 'env-schema';

interface EnvSchema {
  PORT: string;
  HOST: string;
  DATABASE_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  LOGTAIL_TOKEN: string;

  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD?: string;
}

export const env = envSchema<EnvSchema>({
  schema: {
    type: 'object',
    required: [
      'PORT',
      'HOST',
      'DATABASE_URL',
      'JWT_ACCESS_SECRET',
      'JWT_REFRESH_SECRET',
      'LOGTAIL_TOKEN',
    ],
    properties: {
      PORT: { type: 'string', default: '3000' },
      HOST: { type: 'string', default: '0.0.0.0' }, // ✅ important pentru Docker
      DATABASE_URL: { type: 'string' },
      JWT_ACCESS_SECRET: { type: 'string' },
      JWT_REFRESH_SECRET: { type: 'string' },
      LOGTAIL_TOKEN: { type: 'string', default: '' }, // fallback OK
      REDIS_HOST: { type: 'string', default: 'localhost' },
      REDIS_PORT: { type: 'string', default: '6379' },
      REDIS_PASSWORD: { type: 'string' },
    },
  },
  dotenv: true,
});
