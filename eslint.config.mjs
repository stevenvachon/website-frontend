import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import security from 'eslint-plugin-security';

export default defineConfig([
  globalIgnores(['./build/*', './coverage/*']),
  {
    files: ['./*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['./src/scripts/**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
    plugins: { security },
    extends: ['security/recommended'],
  },
  {
    files: ['./src/scripts/**/*.test.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.nodeBuiltin },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
]);
