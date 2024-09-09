import { createStore } from 'zustand/vanilla';

import libui from '@/i18n/translations/libui.json';

import type { Language, Translations } from './types';

type InitOptions = {
  defaultLanguage?: Language;
  translations: Translations;
};

export type TranslationStore = {
  defaultLanguage: Language;
  init: (options: InitOptions) => void;
  isInitialized: boolean;
  translations: Translations;
};

export const translationStore = createStore<TranslationStore>((set) => ({
  defaultLanguage: 'en',
  init({ defaultLanguage, translations }) {
    if (this.isInitialized) {
      console.error('Cannot reinitialize translations store');
      return;
    }
    set((state) => {
      return {
        defaultLanguage: defaultLanguage,
        isInitialized: true,
        translations: {
          ...state.translations,
          ...translations
        }
      };
    });
  },
  isInitialized: false,
  translations: { libui }
}));
