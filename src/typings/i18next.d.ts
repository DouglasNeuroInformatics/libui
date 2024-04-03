import libui from '../translations/libui.json';

import type { DefaultNS, Language, TranslatedResource } from '../i18n';

import 'i18next';

declare module 'i18next' {
  type CustomResources = {
    libui: TranslatedResource<typeof libui>;
  };

  type CustomTypeOptions = {
    defaultNS: DefaultNS;
    resources: CustomResources;
  };

  type i18n = {
    resolvedLanguage?: Language;
  };
}
