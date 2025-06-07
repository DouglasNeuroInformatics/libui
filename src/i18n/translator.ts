import { format } from '@douglasneuroinformatics/libjs';
import { get } from 'lodash-es';
import type { SetOptional } from 'type-fest';

import libui from './translations/libui.json';

import type {
  Language,
  TranslateFormatArgs,
  TranslateOptions,
  TranslationKey,
  TranslationKeyForNamespace,
  TranslationNamespace,
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

export class Translator implements TranslatorType {
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
    document.documentElement.lang = language;
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

  t(translation: { [L in Language]?: string }, options?: TranslateOptions): string;
  t(key: TranslationKey, options?: TranslateOptions): string;
  t<TNamespace extends TranslationNamespace>(
    namespace: TNamespace,
    key: TranslationKeyForNamespace<NoInfer<TNamespace>>,
    options?: TranslateOptions
  ): string;
  @InitializedOnly
  t(...args: any[]): string {
    let obj: { [key: string]: string };
    let opts: TranslateOptions | undefined;
    if (typeof args[0] === 'string') {
      let target: string;
      if (typeof args[1] === 'string') {
        target = `${args[0]}.${args[1]}`;
        opts = args[2] as TranslateOptions | undefined;
      } else {
        target = args[0];
        opts = args[1] as TranslateOptions | undefined;
      }
      obj = (get(this.#config.translations, target) ?? {}) as { [key: string]: string };
    } else {
      obj = args[0] as { [key: string]: string };
      opts = args[1] as TranslateOptions | undefined;
    }
    const value = obj[this.#resolvedLanguage] ?? obj[this.#config.defaultLanguage];
    if (!value) {
      console.error(`Failed to extract translation from object '${JSON.stringify(obj)}'`);
      return '';
    }
    if (!opts?.args) {
      return value;
    }
    return format(value, ...this.getFormatArgs(opts.args));
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
