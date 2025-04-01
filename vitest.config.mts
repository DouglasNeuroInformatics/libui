import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ['**/*.d.ts', '**/index.ts', '**/*.stories.tsx', 'src/testing/*'],
        include: ['src/**/*'],
        provider: 'v8',
        thresholds: {
          branches: 60,
          functions: 30,
          lines: 40,
          statements: 40
        }
      },
      environment: 'happy-dom',
      root: import.meta.dirname,
      setupFiles: ['src/testing/setup-tests.ts'],
      watch: false
    }
  })
);
