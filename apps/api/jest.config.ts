import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  globalSetup: '<rootDir>/scripts/setupTestDB.ts',
  // === Coverage ===
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // tot codul sursă
    '!src/**/*.d.ts', // ignore tip definitions
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],

  // opțional, dacă folosești ECMAScriptModules
  // extensionsToTreatAsEsm: ['.ts'],
  // globals: { 'ts-jest': { useESM: true } },
};

export default config;
