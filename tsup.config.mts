import fs from 'node:fs/promises';
import path from 'node:path';

import { defineConfig } from 'tsup';

export default defineConfig([
  {
    banner: {
      js: '"use client"'
    },
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
    onSuccess: async () => {
      await fs.cp(
        path.resolve(import.meta.dirname, 'src/tailwind/globals.css'),
        path.resolve(import.meta.dirname, 'dist/tailwind/globals.css')
      );
    },
    target: 'es2020'
  }
]);
