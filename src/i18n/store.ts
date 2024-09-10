import { get } from 'lodash-es';
import type { SetOptional } from 'type-fest';
import { createStore } from 'zustand/vanilla';

import libui from '@/i18n/translations/libui.json';

import type { Language, TranslateFunction, Translations } from './types';

type InitOptions = {
  defaultLanguage?: Language;
  fallbackLanguage?: Language;
  translations?: SetOptional<Translations, 'libui'>;
};

type I18N = {
  init: (options?: InitOptions) => void;
  t: TranslateFunction;
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

export const i18n: I18N = {
  init: ({ defaultLanguage, fallbackLanguage, translations }: InitOptions = {}) => {
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
  },
  t: (arg) => {
    const { fallbackLanguage, resolvedLanguage, translations } = translationStore.getState();
    const value = typeof arg === 'string' ? (get(translations, arg, arg) as { [key: string]: string }) : arg;
    return value[resolvedLanguage] ?? value[fallbackLanguage];
  }
};
