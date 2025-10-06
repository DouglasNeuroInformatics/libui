import { useEffect, useMemo, useState } from 'react';

import type {
  TranslateFunction,
  TranslationKey,
  TranslationKeyForNamespace,
  TranslationNamespace,
  TranslatorType
} from '@/i18n';

// this is required since our storybook manager plugin cannot use vite aliases
import { i18n } from '../../i18n';

export function useTranslation(): TranslatorType<TranslationKey>;
export function useTranslation<TNamespace extends TranslationNamespace>(
  namespace: TNamespace
): TranslatorType<TranslationKeyForNamespace<TNamespace>>;
export function useTranslation(namespace?: TranslationNamespace): TranslatorType<string> {
  const [resolvedLanguage, setResolvedLanguage] = useState(i18n.resolvedLanguage);
  const { changeLanguage, t } = useMemo(() => {
    const t: TranslateFunction<string> = (target, options) => {
      if (typeof target === 'object') {
        return i18n.t(target, options);
      }
      return i18n.t((namespace ? `${namespace}.${target}` : target) as TranslationKey, options);
    };
    return {
      changeLanguage: i18n.changeLanguage.bind(i18n),
      t
    };
  }, [resolvedLanguage]);

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
}
