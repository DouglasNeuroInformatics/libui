import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022'
  },
  plugins: [
    react({
      useAtYourOwnRisk_mutateSwcOptions: (options) => {
        options.jsc!.parser!.decorators = true;
        options.jsc!.transform!.decoratorVersion = '2022-03';
      }
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src')
    }
  }
});
