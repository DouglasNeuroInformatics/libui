import { isPlainObject } from '@douglasneuroinformatics/libjs';
import { createInstance } from 'i18next';
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
  if (!isPlainObject) {
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
    en: createResourcesForLanguage(translations, 'en'),
    fr: createResourcesForLanguage(translations, 'fr')
  } as TranslatedResource<T>;
}

export const resources = createResources({ libui });

export const i18n = createInstance({
  fallbackLng: 'en' satisfies Language,
  interpolation: {
    escapeValue: false
  },
  lng: 'en' satisfies Language,
  resources,
  returnObjects: true,
  supportedLngs
}).use(initReactI18next);
