import fs from 'node:fs/promises';
import path from 'node:path';

import { defineConfig } from 'tsup';

// async function resolveEntries(targetDir: string) {
//   const baseDir = path.join('src', targetDir);
//   const entries: { [key: string]: string } = {
//     [targetDir]: path.join(baseDir, 'index.ts')
//   };
//   for (const dirname of await fs.readdir(baseDir, 'utf-8')) {
//     const dirpath = path.join(baseDir, dirname);
//     if (!(await fs.lstat(dirpath)).isDirectory()) {
//       continue;
//     }
//     entries[`${targetDir}/${dirname}`] = path.join(dirpath, 'index.ts');
//   }
//   return entries;
// }

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
    target: 'es2020'
  },
  {
    cjsInterop: true,
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
