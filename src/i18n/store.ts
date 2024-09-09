import type { SetOptional } from 'type-fest';
import { createStore } from 'zustand/vanilla';

import libui from '@/i18n/translations/libui.json';

import type { Language, Translations } from './types';

type InitOptions = {
  defaultLanguage?: Language;
  fallbackLanguage?: Language;
  translations: SetOptional<Translations, 'libui'>;
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

export const initI18Next = ({ defaultLanguage, fallbackLanguage, translations }: InitOptions) => {
  const state = translationStore.getState();
  if (state.isInitialized) {
    console.error('Cannot reinitialize translations store');
    return;
  }
  translationStore.setState({
    fallbackLanguage,
    isInitialized: true,
    resolvedLanguage: defaultLanguage,
    translations: {
      ...state.translations,
      ...translations
    }
  });
};
