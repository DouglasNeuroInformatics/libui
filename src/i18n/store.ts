import type { SetOptional } from 'type-fest';
import { createStore } from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

import libui from '@/i18n/translations/libui.json';

import { getTranslation } from './internal';

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

export const translationStore = createStore(
  subscribeWithSelector<TranslationStore>((set) => ({
    changeLanguage(language) {
      set({ resolvedLanguage: language });
    },
    fallbackLanguage: 'en',
    isInitialized: false,
    resolvedLanguage: 'en',
    translations: { libui }
  }))
);

export const i18n: I18N = {
  init: ({ defaultLanguage, fallbackLanguage, translations }: InitOptions = {}) => {
    const state = translationStore.getState();
    if (state.isInitialized) {
      console.error('Cannot reinitialize translations store');
      return;
    }
    translationStore.subscribe(
      (state) => state.resolvedLanguage,
      (resolvedLanguage) => {
        document.documentElement.lang = resolvedLanguage;
      }
    );
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
  t: (target, ...args) => {
    const state = translationStore.getState();
    return getTranslation(target, state, ...args);
  }
};
