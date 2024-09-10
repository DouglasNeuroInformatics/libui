import { format } from '@douglasneuroinformatics/libjs';
import { get } from 'lodash-es';
import type { Primitive } from 'type-fest';

import type { Language } from './types';

export function getTranslation(
  target: { [L in Language]?: string } | string,
  state: {
    fallbackLanguage: Language;
    resolvedLanguage: Language;
    translations: { [key: string]: any };
  },
  ...args: Exclude<Primitive, symbol>[]
) {
  let value: { [key: string]: string };
  if (typeof target === 'string') {
    value = get(state.translations, target) as { [key: string]: string };
  } else {
    value = target;
  }
  return format((value[state.resolvedLanguage] ?? value[state.fallbackLanguage])!, ...args);
}
