import { format } from '@douglasneuroinformatics/libjs';
import { get } from 'lodash-es';
import type { Primitive, SetOptional } from 'type-fest';

import libui from '@/i18n/translations/libui.json';

import type { Language, TranslationKey, Translations } from './types';

type LanguageChangeHandler = (this: void, language: Language) => void;

type TranslatorConfig = {
  defaultLanguage?: Language;
  onLanguageChange?: LanguageChangeHandler;
  translations: SetOptional<Translations, 'libui'>;
};

function InitializedOnly<T extends Translator, TArgs extends any[], TReturn>(
  target: (this: T, ...args: TArgs) => TReturn,
  context: ClassGetterDecoratorContext<T> | ClassMethodDecoratorContext<T> | ClassSetterDecoratorContext<T>
) {
  const name = context.name.toString();
  function replacementMethod(this: T, ...args: TArgs): TReturn {
    if (!this.isInitialized) {
      throw new Error(`Cannot access ${context.kind} '${name}' of Translator instance before initialization`);
    }
    return target.call(this, ...args);
  }
  return replacementMethod;
}

export class Translator {
  #config: TranslatorConfig;
  #resolvedLanguage: Language;

  constructor() {
    // in the implementation, these should only be accessed in methods decorated with @InitializedOnly
    this.#config = null!;
    this.#resolvedLanguage = null!;
  }

  get isInitialized() {
    return this.#config !== null;
  }

  @InitializedOnly
  get resolvedLanguage() {
    return this.#resolvedLanguage;
  }

  @InitializedOnly
  changeLanguage(language: Language) {
    this.#resolvedLanguage = language;
    document.documentElement.lang = language;
  }

  init({ translations, ...config }: TranslatorConfig) {
    if (this.isInitialized) {
      throw new Error('Cannot reinitialize Translator');
    }
    this.#config = {
      translations: {
        libui,
        ...translations
      },
      ...config
    };
    this.changeLanguage(config.defaultLanguage ?? 'en');
  }

  @InitializedOnly
  t(target: TranslationKey | { [L in Language]?: string }, ...args: Exclude<Primitive, symbol>[]) {
    let value: { [key: string]: string };
    if (typeof target === 'string') {
      value = get(this.#config.translations, target) as { [key: string]: string };
    } else {
      value = target;
    }
    return format(value[this.#resolvedLanguage]!, ...args);
  }
}
