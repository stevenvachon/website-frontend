import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import security from 'eslint-plugin-security';

export default defineConfig([
  globalIgnores(['./build/*', './coverage/*']),
  {
    files: ['./*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['./src/scripts/**/*.js'],
    languageOptions: { globals: globals.browser },
    plugins: { security },
    extends: ['security/recommended'],
  },
  {
    files: ['./src/scripts/**/*.test.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.nodeBuiltin },
    },
  },
  {
    files: ['**/*.js'],
    plugins: { js },
    extends: ['js/recommended'],
  },
]);
