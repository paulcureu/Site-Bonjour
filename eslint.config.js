// eslint.config.js - VERSIUNE FĂRĂ TAILWIND

import storybook from 'eslint-plugin-storybook/dist/index.js';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignoră folderele de build și dependențe
  {
    ignores: ['dist/', 'node_modules/', 'build/', '.turbo/', 'coverage/'],
  },

  // Configurare globală pentru toate fișierele TypeScript/React
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Configurare pentru Storybook
  storybook.configs['flat/recommended'],
);
