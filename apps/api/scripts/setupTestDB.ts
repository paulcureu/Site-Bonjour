// __tests__/setupTestDB.ts
import { execSync } from 'child_process';
import dotenv from 'dotenv';

export default async function globalSetup() {
  dotenv.config({ path: '.env.test' });

  console.log('[Test Setup] Resetting DB:', process.env.DATABASE_URL);

  // Reset DB (drop + migrate latest schema)
  execSync('npx prisma migrate reset --force --skip-generate --schema=prisma/schema.prisma', {
    stdio: 'inherit',
    env: { ...process.env },
  });

  // Run seed script
  execSync('npx ts-node prisma/seed.ts', {
    stdio: 'inherit',
    env: { ...process.env },
  });
}
