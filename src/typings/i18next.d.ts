import libui from '../translations/libui.json';

import type { DefaultNS, Language, TranslatedResource } from '../i18n';

import 'i18next';

declare module 'i18next' {
  interface CustomResources {
    libui: TranslatedResource<typeof libui>;
  }

  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: CustomResources;
  }

  interface i18n {
    resolvedLanguage?: Language;
  }
}
