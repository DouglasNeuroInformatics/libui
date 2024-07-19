import { isPlainObject } from '@douglasneuroinformatics/libjs';
import { type i18n as I18n, createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { mapValues } from 'lodash-es';
import { initReactI18next } from 'react-i18next';
import type { EmptyObject, ValueOf } from 'type-fest';

import libui from './translations/libui.json';

export const supportedLngs = ['en', 'fr'] as const;

export type Language = (typeof supportedLngs)[number];

export type TranslationsDef = { [key: string]: { [key: string]: unknown } };

export type TranslatedResource<T = EmptyObject> = {
  [K in keyof T]: T[K] extends { [key: string]: unknown }
    ? T[K] extends { [K in Language]: unknown }
      ? ValueOf<T[K]>
      : TranslatedResource<T[K]>
    : T[K];
};

export function transformTranslations<T extends { [key: string]: any }>(translations: T, locale: string) {
  if (!isPlainObject(translations)) {
    throw new Error('Invalid format of translations: must be plain object');
  }
  const result: { [key: string]: unknown } = {};
  for (const key in translations) {
    const value = translations[key];
    if (Object.hasOwn(value, locale)) {
      result[key] = value[locale as keyof typeof value];
    } else {
      result[key] = transformTranslations(value, locale);
    }
  }
  return result;
}

export function createResourcesForLanguage<T extends TranslationsDef>(translations: T, locale: Language) {
  return mapValues(translations, (value) => transformTranslations(value, locale));
}

export function createResources<T extends TranslationsDef>(translations: T) {
  return {
    en: createResourcesForLanguage(translations, 'en') as TranslatedResource<T>,
    fr: createResourcesForLanguage(translations, 'fr') as TranslatedResource<T>
  };
}

export const resources = createResources({ libui });

const i18n = createInstance({
  fallbackLng: 'en' satisfies Language,
  interpolation: {
    escapeValue: false
  },
  lng: 'en' satisfies Language,
  resources,
  returnObjects: true,
  supportedLngs
}) as {
  addPreInitTranslations<T extends TranslationsDef>(translations: T): void;
} & I18n;

i18n.addPreInitTranslations = function (this, translations) {
  if (!this.options.resources) {
    console.error("Cannot add additional translations to i18next instance: 'this.options.resources' is undefined");
    return;
  }
  const resources = createResources(translations);
  Object.assign(this.options.resources.en!, resources.en);
  Object.assign(this.options.resources.fr!, resources.fr);
};

i18n.use(initReactI18next).use(LanguageDetector);

export { i18n };
