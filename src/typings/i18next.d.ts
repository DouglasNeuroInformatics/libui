/* eslint-disable @typescript-eslint/consistent-type-definitions */

import libui from '../translations/libui.json';

import type { Language, TranslatedResource } from '../i18n.js';

import 'i18next';

declare module 'i18next' {
  interface CustomResources {
    libui: TranslatedResource<typeof libui>;
  }

  interface CustomTypeOptions {
    resources: CustomResources;
  }

  interface i18n {
    resolvedLanguage?: Language;
  }
}
