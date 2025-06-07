import type { SetOptional } from 'type-fest';

import type { Language, Translations } from './types';

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
  #config: null | TranslatorConfig;
  #resolvedLanguage: Language | null;

  constructor() {
    this.#config = null;
    this.#resolvedLanguage = null;
  }

  get isInitialized() {
    return this.#config !== null;
  }

  @InitializedOnly
  get resolvedLanguage() {
    return this.#resolvedLanguage!;
  }

  @InitializedOnly
  changeLanguage(language: Language) {
    this.#resolvedLanguage = language;
  }

  init(config: TranslatorConfig) {
    if (this.isInitialized) {
      throw new Error('Cannot reinitialize Translator');
    }
    this.#config = config;
    this.#resolvedLanguage = config.defaultLanguage ?? 'en';
  }
}
