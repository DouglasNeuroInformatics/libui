import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022'
  },
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
      exclude: ['**/*.d.ts', '**/index.ts', '**/*.stories.tsx', 'src/testing/*'],
      include: ['src/**/*'],
      provider: 'v8',
      thresholds: {
        branches: 75,
        functions: 30,
        lines: 50,
        statements: 50
      }
    },
    environment: 'happy-dom',
    root: import.meta.dirname,
    setupFiles: ['src/testing/setup-tests.ts'],
    watch: false
  }
});
