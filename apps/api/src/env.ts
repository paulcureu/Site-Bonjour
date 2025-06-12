// apps/api/src/env.ts
import envSchema from 'env-schema';

// Am adăugat noile variabile pentru SMTP
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
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  EMAIL_FROM: string;
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
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASS',
      'EMAIL_FROM',
    ],
    properties: {
      PORT: { type: 'string', default: '3000' },
      HOST: { type: 'string', default: '0.0.0.0' },
      DATABASE_URL: { type: 'string' },
      JWT_ACCESS_SECRET: { type: 'string' },
      JWT_REFRESH_SECRET: { type: 'string' },
      LOGTAIL_TOKEN: { type: 'string', default: '' },
      REDIS_HOST: { type: 'string', default: 'localhost' },
      REDIS_PORT: { type: 'string', default: '6379' },
      REDIS_PASSWORD: { type: 'string' },
      // --- Adăugăm proprietățile pentru SMTP ---
      SMTP_HOST: { type: 'string' },
      SMTP_PORT: { type: 'string' },
      SMTP_USER: { type: 'string' },
      SMTP_PASS: { type: 'string' },
      EMAIL_FROM: { type: 'string' },
    },
  },
  dotenv: true,
});
