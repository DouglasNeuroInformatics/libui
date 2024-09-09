import { useCallback } from 'react';

import { get } from 'lodash-es';
import { useStore } from 'zustand';

import { translationStore } from '@/i18n';
import type { TranslateFunction, TranslationNamespace } from '@/i18n';

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
    (arg) => {
      const value = typeof arg === 'string' ? (get(translations, arg, arg) as { [key: string]: string }) : arg;
      return value[resolvedLanguage] ?? value[fallbackLanguage];
    },
    [fallbackLanguage, resolvedLanguage, translations]
  );

  return { changeLanguage, resolvedLanguage, t };
}
