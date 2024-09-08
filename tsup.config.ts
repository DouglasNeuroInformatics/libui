import fs from 'fs/promises';
import path from 'path';

import { defineConfig } from 'tsup';

export default defineConfig([
  {
    dts: true,
    entry: {
      components: 'src/components/index.ts',
      hooks: 'src/hooks/index.ts',
      i18n: 'src/i18n/index.ts',
      utils: 'src/utils/index.ts'
    },
    format: 'esm',
    outDir: 'dist',
    platform: 'browser',
    sourcemap: true,
    splitting: true,
    target: 'es2020'
  },
  {
    dts: true,
    entry: {
      'tailwind/config': 'src/tailwind/config.cts'
    },
    format: 'cjs',
    onSuccess: async () => {
      await fs.cp(
        path.resolve(import.meta.dirname, 'src/tailwind/globals.css'),
        path.resolve(import.meta.dirname, 'dist/tailwind/globals.css')
      );
    },
    outDir: 'dist',
    platform: 'node',
    sourcemap: true
  }
]);
