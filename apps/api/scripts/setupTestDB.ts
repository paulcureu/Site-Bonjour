// scripts/setupTestDB.ts
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as path from 'path';

/* --------------------------------------------------------- */
/* 1. Load ONE .env file (default: .env.test)                */
/* --------------------------------------------------------- */
const envPath = process.env.DOTENV_CONFIG_PATH ?? path.resolve(process.cwd(), '.env.test');

dotenv.config({ path: envPath });

/* --------------------------------------------------------- */
/* 2. Safety guard – DB name must contain "test"             */
/* --------------------------------------------------------- */
if (!process.env.DATABASE_URL?.includes('test')) {
  throw new Error(`[SECURITY] Prevented reset on non-test database! (${process.env.DATABASE_URL})`);
}

async function resetTestDatabase(): Promise<void> {
  console.log('[Test Setup] Resetting DB:', process.env.DATABASE_URL);

  /* 2-a. Reset + apply schema */
  execSync('pnpm exec prisma db push --force-reset --schema=prisma/schema.prisma', {
    stdio: 'inherit',
    env: process.env,
  });

  /* 2-b. Regenerate Prisma Client (ensures new enums/models) */
  execSync('pnpm exec prisma generate --schema=prisma/schema.prisma', {
    stdio: 'inherit',
    env: process.env,
  });

  /* 2-c. Seed fresh data */
  execSync('pnpm exec ts-node prisma/seed.ts', {
    stdio: 'inherit',
    env: process.env,
  });
}

/* Jest globalSetup */
export default resetTestDatabase;

/* Allow manual run: `pnpm ts-node scripts/setupTestDB.ts` */
if (require.main === module) {
  resetTestDatabase();
}
