/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */

import type { Merge, OmitIndexSignature, Primitive, Simplify } from 'type-fest';

import type libuiTranslations from './translations/libui.json';

interface TranslationsLike {
  [key: string]: TranslationsLike | TranslationValue;
}

interface DefaultLanguageOptions {
  en: true;
  es: true;
  fr: true;
}

/**
 * The shape used to *identify* a translation leaf, as opposed to a group of nested translations.
 * This is always partial, so that key extraction is unaffected by {@link RequireCompleteTranslations}.
 */
type TranslationValueLike = { [L in Language]?: string };

export declare namespace UserConfig {
  interface LanguageOptions {
    [key: string]: boolean;
  }
  /**
   * Opt-in flags, set by consumers through declaration merging. This interface is intentionally
   * empty here: declaring a member with a default (e.g. `requireCompleteTranslations?: boolean`)
   * would make a consumer's `requireCompleteTranslations: true` an illegal redeclaration, since
   * merged interface members must have identical types.
   *
   * @example
   * declare module '@douglasneuroinformatics/libui/i18n' {
   *   export namespace UserConfig {
   *     export interface Options {
   *       requireCompleteTranslations: true;
   *     }
   *   }
   * }
   */
  interface Options {}
  interface Translations extends TranslationsLike {}
}

export type LanguageOptions = OmitIndexSignature<Merge<DefaultLanguageOptions, UserConfig.LanguageOptions>>;

export type Language = keyof { [L in keyof LanguageOptions as LanguageOptions[L] extends true ? L : never]: any };

/**
 * Whether every language in {@link LanguageOptions} must be provided for each translation, as
 * opposed to falling back to the default language at runtime. Set via `UserConfig.Options`.
 */
export type RequireCompleteTranslations = UserConfig.Options extends { requireCompleteTranslations: true }
  ? true
  : false;

/**
 * The shape a translation leaf must *satisfy*, whether it is defined inline or in a JSON file.
 */
export type TranslationValue = RequireCompleteTranslations extends true
  ? { [L in Language]: string }
  : TranslationValueLike;

export type Translations = Simplify<
  OmitIndexSignature<UserConfig.Translations> & {
    libui: typeof libuiTranslations;
  }
>;

export type ExtractTranslationKey<T extends { [key: string]: any }, Key = keyof T> = Key extends string
  ? T[Key] extends { [key: string]: any }
    ? T[Key] extends TranslationValueLike
      ? Key
      : `${Key}.${ExtractTranslationKey<T[Key]>}`
    : `${Key}`
  : never;

export type TranslationNamespace = Extract<keyof Translations, string>;

export type TranslationKey = ExtractTranslationKey<Translations>;

export type TranslationKeyForNamespace<TNamespace extends TranslationNamespace> =
  Extract<TranslationKey, `${TNamespace}.${string}`> extends `${TNamespace}.${infer TKey}` ? TKey : never;

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
  (translations: TranslationValue, options?: TranslateOptions): string;
}

export type TranslatorType<TKey extends string> = {
  changeLanguage: (language: Language) => void;
  resolvedLanguage: Language;
  t: TranslateFunction<TKey>;
};
