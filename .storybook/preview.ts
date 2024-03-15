import type { Preview } from '@storybook/react';

import i18n from '../src/i18n';
import theme from './theme';

import '../src/styles/globals.css';

const preview: Preview = {
  globals: {
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
    },
    i18n
  }
};

export default preview;
