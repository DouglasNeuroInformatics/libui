import { config } from '@douglasneuroinformatics/eslint-config';

export default config({
  env: {
    browser: true,
    es2021: true
  },
  jsdoc: {
    enabled: false
  },
  react: {
    enabled: true
  }
});
