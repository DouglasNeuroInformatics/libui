import { useContext } from 'react';

import { get } from 'lodash-es';

import { TranslationContext } from '@/context/TranslationContext';
import type { TranslateFunction, TranslationNamespace } from '@/i18n';

export function useTranslation<TNamespace extends TranslationNamespace | undefined = undefined>(
  namespace?: TNamespace
) {
  const ctx = useContext(TranslationContext);
  const translations = namespace ? ctx.translations[namespace] : ctx.translations;
  const t: TranslateFunction<TNamespace> = (key) => {
    const value = get(translations, key, key) as { [key: string]: string } | string;
    if (typeof value === 'string') {
      return value;
    }
    return value[ctx.resolvedLanguage] ?? value[ctx.defaultLanguage] ?? key;
  };
  return { ...ctx, t };
}
