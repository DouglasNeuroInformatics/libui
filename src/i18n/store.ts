import { createStore } from 'zustand/vanilla';

import libui from '@/i18n/translations/libui.json';

import type { Language, Translations } from './types';

type InitOptions = {
  defaultLanguage?: Language;
  fallbackLanguage?: Language;
  translations: Translations;
};

export type TranslationStore = {
  changeLanguage: (language: Language) => void;
  fallbackLanguage: Language;
  init: (options: InitOptions) => void;
  isInitialized: boolean;
  resolvedLanguage: Language;
  translations: Translations;
};

export const translationStore = createStore<TranslationStore>((set) => ({
  changeLanguage(language) {
    set({ resolvedLanguage: language });
  },
  fallbackLanguage: 'en',
  init({ defaultLanguage, fallbackLanguage, translations }) {
    if (this.isInitialized) {
      console.error('Cannot reinitialize translations store');
      return;
    }
    set((state) => {
      return {
        fallbackLanguage,
        isInitialized: true,
        resolvedLanguage: defaultLanguage,
        translations: {
          ...state.translations,
          ...translations
        }
      };
    });
  },
  isInitialized: false,
  resolvedLanguage: 'en',
  translations: { libui }
}));
