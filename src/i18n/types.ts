/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */

import type { OmitIndexSignature, Primitive, Simplify } from 'type-fest';

import type libuiTranslations from './translations/libui.json';

interface TranslationsLike {
  [key: string]: TranslationsLike | { [L in Language]?: string };
}

export declare namespace UserConfig {
  interface LanguageOptions {
    [key: string]: boolean;
  }
  interface Translations extends TranslationsLike {}
}

export type LanguageOptions = UserConfig.LanguageOptions & {
  en: true;
  fr: true;
};

export type Language = keyof { [L in keyof LanguageOptions as LanguageOptions[L] extends true ? L : never]: any };

export type Translations = Simplify<
  OmitIndexSignature<UserConfig.Translations> & {
    libui: typeof libuiTranslations;
  }
>;

export type ExtractTranslationKey<T extends { [key: string]: any }, Key = keyof T> = Key extends string
  ? T[Key] extends { [key: string]: any }
    ? T[Key] extends { [K in Language]?: string }
      ? Key
      : `${Key}.${ExtractTranslationKey<T[Key]>}`
    : `${Key}`
  : never;

export type TranslationNamespace = Extract<keyof Translations, string>;

export type TranslationKey = ExtractTranslationKey<Translations>;

export type TranslationKeyForNamespace<TNamespace extends TranslationNamespace> =
  TranslationKey extends `${TNamespace}.${infer TKey}` ? TKey : never;

export type TranslateFormatArgs =
  | Exclude<Primitive, symbol>[]
  | {
      [L in Language]?: Exclude<Primitive, symbol>[];
    };

export type TranslateOptions = {
  args?: TranslateFormatArgs;
};

export interface TranslateFunction<TKey extends string> {
  (key: TKey, options?: TranslateOptions): string;
  (translations: { [L in Language]?: string }, options?: TranslateOptions): string;
}

export type TranslatorType<TKey extends string> = {
  changeLanguage: (language: Language) => void;
  resolvedLanguage: Language;
  t: TranslateFunction<TKey>;
};
