/// <reference types="vitest" />

import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer, tailwindcss]
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src')
    }
  },
  test: {
    coverage: {
      exclude: ['**/*.d.ts', '**/index.ts', '**/*.stories.tsx', '**/__mocks__'],
      include: ['src/**/*'],
      provider: 'v8',
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    environment: 'happy-dom',
    setupFiles: [path.resolve(import.meta.dirname, 'src/testing/setup-tests.ts')],
    watch: false
  }
});
