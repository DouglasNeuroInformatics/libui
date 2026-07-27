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

All language keys are optional (`{ [L in Language]?: string }`). When the active language has no translation, the translator falls back to `defaultLanguage` (defaults to `en`).

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

## Adding a new language

1. Add the language code to `LanguageOptions` in `src/i18n/types.ts`.
2. Add translations for every leaf in `src/i18n/translations/libui.json`.
3. Consumers add translations in their own JSON files and pass the language to `LanguageToggle.options`.
