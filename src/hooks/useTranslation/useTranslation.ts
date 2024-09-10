import { useCallback } from 'react';

import { useStore } from 'zustand';

import { translationStore } from '@/i18n';
import type { TranslateFunction, TranslationNamespace } from '@/i18n';
import { getTranslation } from '@/i18n/internal';

export function useTranslation<TNamespace extends TranslationNamespace | undefined = undefined>(
  namespace?: TNamespace
) {
  const changeLanguage = useStore(translationStore, (store) => store.changeLanguage);
  const fallbackLanguage = useStore(translationStore, (store) => store.fallbackLanguage);
  const resolvedLanguage = useStore(translationStore, (store) => store.resolvedLanguage);
  const translations = useStore(translationStore, (store) => {
    if (namespace) {
      return store.translations[namespace];
    }
    return store.translations;
  });

  const t: TranslateFunction<TNamespace> = useCallback(
    (target, ...args) => {
      return getTranslation(target, { fallbackLanguage, resolvedLanguage, translations }, ...args);
    },
    [fallbackLanguage, resolvedLanguage, translations]
  );

  return { changeLanguage, resolvedLanguage, t };
}
