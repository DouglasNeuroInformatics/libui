import { isPlainObject } from '@douglasneuroinformatics/libjs';
import { type i18n as I18n, createInstance } from 'i18next';
import { mapValues } from 'lodash-es';
import { initReactI18next } from 'react-i18next';
import type { EmptyObject, ValueOf } from 'type-fest';

import libui from './translations/libui.json';

const defaultNS = 'libui' as const;
const supportedLngs = ['en', 'fr'] as const;

type DefaultNS = typeof defaultNS;
type Language = (typeof supportedLngs)[number];

type TranslationsDef = { [key: string]: { [key: string]: unknown } };

type TranslatedResource<T = EmptyObject> = {
  [K in keyof T]: T[K] extends { [key: string]: unknown }
    ? T[K] extends { [K in Language]: unknown }
      ? ValueOf<T[K]>
      : TranslatedResource<T[K]>
    : T[K];
};

function transformTranslations<T extends { [key: string]: any }>(translations: T, locale: string) {
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

function createResourcesForLanguage<T extends TranslationsDef>(translations: T, locale: Language) {
  return mapValues(translations, (value) => transformTranslations(value, locale));
}

function createResources<T extends TranslationsDef>(translations: T) {
  return {
    en: createResourcesForLanguage(translations, 'en'),
    fr: createResourcesForLanguage(translations, 'fr')
  } as TranslatedResource<T>;
}

const resources = createResources({ libui });

const i18n = createInstance({
  defaultNS,
  fallbackLng: 'en' satisfies Language,
  interpolation: {
    escapeValue: false
  },
  lng: 'en' satisfies Language,
  resources,
  returnObjects: true,
  supportedLngs
}) as I18n;

await i18n.use(initReactI18next).init();

export default i18n;

export type { DefaultNS, Language, TranslatedResource };
