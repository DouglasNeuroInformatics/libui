import { useCallback } from 'react';

import { get } from 'lodash-es';
import { useStore } from 'zustand';

import { translationStore } from '@/i18n';
import type { TranslateFunction, TranslationNamespace } from '@/i18n';

const { isInitialized } = translationStore.getState();
if (!isInitialized) {
  throw new Error('Cannot access useTranslation hook before i18n initialization');
}

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
    (key) => {
      const value = get(translations, key, key) as { [key: string]: string } | string;
      if (typeof value === 'string') {
        return value;
      }
      return value[resolvedLanguage] ?? value[fallbackLanguage] ?? key;
    },
    [fallbackLanguage, resolvedLanguage, translations]
  );

  return { changeLanguage, resolvedLanguage, t };
}
