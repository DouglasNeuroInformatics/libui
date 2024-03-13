import path from 'path';

import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    path.resolve(import.meta.dirname, 'src/i18n.ts'),
    path.resolve(import.meta.dirname, 'src/utils.ts'),
    path.resolve(import.meta.dirname, 'src/components/index.ts'),
    path.resolve(import.meta.dirname, 'src/hooks/index.ts')
  ],
  format: 'esm',
  outDir: path.resolve(import.meta.dirname, 'dist'),
  platform: 'browser',
  sourcemap: true,
  splitting: true,
  target: 'esnext'
});
