import { format } from '@douglasneuroinformatics/libjs';
import { get } from 'lodash-es';
import type { SetOptional } from 'type-fest';

import libui from './translations/libui.json';

import type {
  Language,
  TranslateFormatArgs,
  TranslateOptions,
  TranslationKey,
  Translations,
  TranslatorType
} from './types';

type TranslatorEventMap = {
  languageChange: (...args: [language: Language]) => void;
};

type TranslatorConfig = {
  defaultLanguage?: Language;
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

export class Translator implements TranslatorType<TranslationKey> {
  #config: Required<TranslatorConfig>;
  #eventHandlers: {
    [K in keyof TranslatorEventMap]: Set<TranslatorEventMap[K]>;
  };
  #resolvedLanguage: Language;

  constructor() {
    // in the implementation, these should only be accessed in methods decorated with @InitializedOnly
    this.#config = null!;
    this.#eventHandlers = {
      languageChange: new Set()
    };
    this.#resolvedLanguage = null!;
  }

  get isInitialized() {
    return this.#config !== null;
  }

  @InitializedOnly
  get resolvedLanguage() {
    return this.#resolvedLanguage;
  }

  addEventListener<TKey extends keyof TranslatorEventMap>(key: TKey, handler: TranslatorEventMap[TKey]) {
    this.#eventHandlers[key].add(handler);
  }

  @InitializedOnly
  changeLanguage(language: Language) {
    this.#resolvedLanguage = language;
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    this.emitEvent('languageChange', [language]);
  }

  init({ defaultLanguage, translations }: TranslatorConfig) {
    if (this.isInitialized) {
      throw new Error('Cannot reinitialize Translator');
    }
    this.#config = {
      defaultLanguage: defaultLanguage ?? 'en',
      translations: {
        libui,
        ...translations
      }
    };
    this.changeLanguage(this.#config.defaultLanguage);
  }

  removeEventListener<TKey extends keyof TranslatorEventMap>(key: TKey, handler: TranslatorEventMap[TKey]) {
    return this.#eventHandlers[key].delete(handler);
  }

  @InitializedOnly
  t(target: TranslationKey | { [L in Language]?: string }, { args }: TranslateOptions = {}): string {
    let obj: { [key: string]: string };
    if (typeof target === 'string') {
      obj = (get(this.#config.translations, target) ?? {}) as { [key: string]: string };
    } else {
      obj = target;
    }
    const value = obj[this.#resolvedLanguage] ?? obj[this.#config.defaultLanguage];
    if (!value) {
      console.error(`Failed to extract translation from object '${JSON.stringify(obj)}'`);
      return '';
    }
    if (!args) {
      return value;
    }
    return format(value, ...this.getFormatArgs(args));
  }

  private emitEvent<TKey extends keyof TranslatorEventMap>(key: TKey, payload: Parameters<TranslatorEventMap[TKey]>) {
    this.#eventHandlers[key].forEach((fn: (...args: any[]) => any) => {
      fn(...payload);
    });
  }

  private getFormatArgs(args: TranslateFormatArgs) {
    if (Array.isArray(args)) {
      return args;
    }
    const result = args[this.#resolvedLanguage] ?? args[this.#config.defaultLanguage];
    if (!result) {
      console.error(`Failed to extract args from object '${JSON.stringify(args)}'`);
      return [];
    }
    return result;
  }
}
