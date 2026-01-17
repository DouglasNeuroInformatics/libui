import type { Preview } from '@storybook/react-vite';

import { i18n } from '../src/i18n/index.ts';
import theme from './theme.ts';

import '../src/tailwind/globals.css';

i18n.init({
  translations: {}
});

const preview: Preview = {
  initialGlobals: {
    locale: 'en',
    locales: {
      en: 'English',
      fr: 'Français'
    }
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme,
      toc: true
    }
  }
};

export default preview;
