import { useCallback, useEffect } from 'react';

import { useStore } from 'zustand';

import type { TranslateFunction, TranslationNamespace } from '@/i18n';

// this is required since our storybook manager plugin cannot use vite aliases
import { i18n } from '../../i18n';

console.log({ i18n });

export function useTranslation<TNamespace extends TranslationNamespace | undefined = undefined>(
  namespace?: TNamespace
) {
  useEffect(() => {
    console.log(i18n.isInitialized);
    i18n.addEventListener('languageChange', (language) => console.log(language));
  }, []);

  return i18n;

  // const changeLanguage = useStore(translationStore, (store) => store.changeLanguage);
  // const fallbackLanguage = useStore(translationStore, (store) => store.fallbackLanguage);
  // const resolvedLanguage = useStore(translationStore, (store) => store.resolvedLanguage);
  // const translations = useStore(translationStore, (store) => {
  //   if (namespace) {
  //     return store.translations[namespace];
  //   }
  //   return store.translations;
  // });
  // const t: TranslateFunction<TNamespace> = useCallback(
  //   (target, ...args) => {
  //     return getTranslation(target, { fallbackLanguage, resolvedLanguage, translations }, ...args);
  //   },
  //   [fallbackLanguage, resolvedLanguage, translations]
  // );
  // return { changeLanguage, resolvedLanguage, t };
}
