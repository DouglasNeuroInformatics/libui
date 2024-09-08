import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    components: 'src/components/index.ts',
    hooks: 'src/hooks/index.ts',
    utils: 'src/utils.ts'
  },
  format: 'esm',
  outDir: 'dist',
  platform: 'browser',
  sourcemap: true,
  splitting: true,
  target: 'es2020'
});
