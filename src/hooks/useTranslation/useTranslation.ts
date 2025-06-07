import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Primitive } from 'type-fest';
import { useStore } from 'zustand';

import type { Language, TranslateFunction, TranslationKey, TranslationNamespace } from '@/i18n';

// this is required since our storybook manager plugin cannot use vite aliases
import { i18n } from '../../i18n';

export function useTranslation<TNamespace extends TranslationNamespace | undefined = undefined>(
  namespace?: TNamespace
) {
  const [resolvedLanguage, setResolvedLanguage] = useState(i18n.resolvedLanguage);
  const { changeLanguage, t } = useMemo(() => {
    const _t = i18n.t.bind(i18n);
    return {
      changeLanguage: i18n.changeLanguage.bind(i18n),
      t: (target: TranslationKey<TNamespace> | { [L in Language]?: string }, ...args: Exclude<Primitive, symbol>[]) => {
        if (namespace && typeof target === 'string') {
          const x = `${namespace}.${target}`;
          return _t(`${namespace}.${target}`, ...args);
        }
      }
    };
  }, []);

  useEffect(() => {
    i18n.addEventListener('languageChange', setResolvedLanguage);
    return () => {
      i18n.removeEventListener('languageChange', setResolvedLanguage);
    };
  }, []);

  return {
    changeLanguage,
    resolvedLanguage,
    t
  };

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
