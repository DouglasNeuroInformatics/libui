# Translation System

libui ships a type-safe, JSON-driven translation system. Consumers can extend it via TypeScript declaration merging without forking the library.

## Built-in languages

The `Language` type includes `en`, `es`, and `fr` out of the box. Every leaf node in a translation JSON file is an object keyed by language code with an optional string value:

```json
{
  "greeting": {
    "en": "Hello",
    "es": "Hola",
    "fr": "Bonjour"
  }
}
```

By default, all language keys are optional (`{ [L in Language]?: string }`). When the active language has no translation, the translator falls back to `defaultLanguage` (defaults to `en`). Consumers who want every language to be mandatory can opt in — see [Requiring complete translations](#requiring-complete-translations).

## Architecture

| File                                         | Role                                                                                            |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/i18n/types.ts`                          | Defines `Language`, `Translations`, `TranslationKey`, and the extensible `UserConfig` namespace |
| `src/i18n/translator.ts`                     | `Translator` class — singleton that resolves translations at runtime                            |
| `src/i18n/translations/libui.json`           | libui's own UI string translations                                                              |
| `src/hooks/useTranslation/useTranslation.ts` | React hook wrapping the translator with re-render on language change                            |

## How it works

### 1. Language resolution

`LanguageOptions` is a merged interface:

```ts
export type LanguageOptions = UserConfig.LanguageOptions & {
  en: true;
  es: true;
  fr: true;
};
export type Language = keyof { [L in keyof LanguageOptions as LanguageOptions[L] extends true ? L : never]: any };
```

Consumers can add languages via declaration merging on `UserConfig.LanguageOptions`.

### 2. Translation namespaces

Translation JSON files are registered as namespaces. libui registers `libui` automatically. Consumers register their own via `UserConfig.Translations`:

```ts
declare module '@douglasneuroinformatics/libui/i18n' {
  export namespace UserConfig {
    export interface Translations {
      myNamespace: typeof import('./translations/my-namespace.json');
    }
  }
}
```

Translation keys are then dot-paths: `myNamespace.greeting`.

### 3. Initialization

Call `i18n.init()` once at app startup:

```ts
import { i18n } from '@douglasneuroinformatics/libui/i18n';
import myTranslations from './translations/my-namespace.json';

i18n.init({
  defaultLanguage: 'en',
  translations: { myNamespace: myTranslations }
});
```

### 4. Using translations

The `useTranslation` hook provides `t()`, `resolvedLanguage`, and `changeLanguage`:

```tsx
const { t } = useTranslation('myNamespace');

// Key-based (typed, autocompleted)
t('greeting');

// Inline object (for one-off strings)
t({ en: 'Save', es: 'Guardar', fr: 'Enregistrer' });

// With format arguments
t('welcome', { args: ['World'] }); // "Hello, World"
```

### 5. Controlling which languages appear in the UI

The `LanguageToggle` component renders a dropdown from the `options` prop — only languages you pass are shown. This lets the consuming app control which languages are user-selectable independently of which languages exist in the type system.

```tsx
<LanguageToggle options={{ en: 'English', fr: 'Français' }} />
```

## Requiring complete translations

By default a translation may omit languages and fall back at runtime. Set `requireCompleteTranslations` on `UserConfig.Options` to make every language in `LanguageOptions` mandatory:

```ts
declare module '@douglasneuroinformatics/libui/i18n' {
  export namespace UserConfig {
    export interface Options {
      requireCompleteTranslations: true;
    }
  }
}
```

With the flag set, both registered JSON namespaces and inline objects are checked:

```ts
// error: Property 'fr' is missing in type '{ en: string; es: string; }'
t({ en: 'Save', es: 'Guardar' });
```

```ts
// common.json is missing "fr" for one or more keys
declare module '@douglasneuroinformatics/libui/i18n' {
  export namespace UserConfig {
    export interface Translations {
      // error: Property 'common' ... is not assignable to 'string' index type
      common: typeof common;
    }
  }
}
```

The JSON error is reported on the offending property in your own `declare module` block, so it is unaffected by `skipLibCheck`. Note that:

- Leaf **detection** stays permissive, so adding a language that `libui.json` does not yet translate never corrupts `TranslationKey`.
- libui's own `libui` namespace is exempt from the check — it is typed directly from `libui.json` rather than through the index signature.
- Per-language format arguments (`TranslateFormatArgs`) remain optional, since they are a formatting convenience rather than translated copy.

## Adding a new language

1. Add the language code to `LanguageOptions` in `src/i18n/types.ts`.
2. Add translations for every leaf in `src/i18n/translations/libui.json`.
3. Consumers add translations in their own JSON files and pass the language to `LanguageToggle.options`.
