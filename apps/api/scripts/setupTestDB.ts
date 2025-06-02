// __tests__/setupTestDB.ts
import { execSync } from 'child_process';
import dotenv from 'dotenv';

async function resetTestDatabase() {
  dotenv.config({ path: '.env.test' });

  if (!process.env.DATABASE_URL?.includes('site_test_db')) {
    throw new Error('[SECURITY] Prevented reset on non-test database!');
  }

  console.log('[Test Setup] Resetting DB:', process.env.DATABASE_URL);

  execSync('npx prisma migrate reset --force --skip-generate --schema=prisma/schema.prisma', {
    stdio: 'inherit',
    env: { ...process.env },
  });

  execSync('npx ts-node prisma/seed.ts', {
    stdio: 'inherit',
    env: { ...process.env },
  });
}

// ✅ Exportă pentru Jest globalSetup
export default resetTestDatabase;

// ✅ Permite rulare manuală
if (require.main === module) {
  resetTestDatabase();
}
