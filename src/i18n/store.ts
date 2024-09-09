import type { SetOptional } from 'type-fest';
import { createStore } from 'zustand/vanilla';

import libui from '@/i18n/translations/libui.json';

import type { Language, Translations } from './types';

type InitOptions = {
  defaultLanguage?: Language;
  fallbackLanguage?: Language;
  translations?: SetOptional<Translations, 'libui'>;
};

export type TranslationStore = {
  changeLanguage: (language: Language) => void;
  fallbackLanguage: Language;
  isInitialized: boolean;
  resolvedLanguage: Language;
  translations: Translations;
};

export const translationStore = createStore<TranslationStore>((set) => ({
  changeLanguage(language) {
    set({ resolvedLanguage: language });
  },
  fallbackLanguage: 'en',
  isInitialized: false,
  resolvedLanguage: 'en',
  translations: { libui }
}));

export const init = ({ defaultLanguage, fallbackLanguage, translations }: InitOptions = {}) => {
  const state = translationStore.getState();
  if (state.isInitialized) {
    console.error('Cannot reinitialize translations store');
    return;
  }
  translationStore.setState({
    fallbackLanguage: fallbackLanguage ?? state.fallbackLanguage,
    isInitialized: true,
    resolvedLanguage: defaultLanguage ?? state.resolvedLanguage,
    translations: {
      ...state.translations,
      ...translations
    }
  });
};
