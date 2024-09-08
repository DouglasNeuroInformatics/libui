import { createContext } from 'react';

import libui from '../translations/libui.json';

import type { I18N } from '../i18n.js';

type TranslationContextType = {
  defaultLanguage: I18N.Language;
  resolvedLanguage: I18N.Language;
  translations: I18N.Translations;
};

export const TranslationContext = createContext<TranslationContextType>({
  defaultLanguage: 'en',
  resolvedLanguage: 'en',
  translations: {
    libui
  }
});
