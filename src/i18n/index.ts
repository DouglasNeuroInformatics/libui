/* eslint-disable @typescript-eslint/consistent-type-definitions */

export interface LanguageOptions {
  [key: string]: boolean;
  en: true;
  fr: true;
}

export type Language = keyof { [L in keyof LanguageOptions as LanguageOptions[L] extends true ? L : never]: any };

export interface Translations {
  libui: {
    days: {
      friday: {
        [L in Language]: string;
      };
      monday: {
        [L in Language]: string;
      };
      saturday: {
        [L in Language]: string;
      };
      sunday: {
        [L in Language]: string;
      };
      thursday: {
        [L in Language]: string;
      };
      tuesday: {
        [L in Language]: string;
      };
      wednesday: {
        [L in Language]: string;
      };
    };
    form: {
      append: {
        [L in Language]: string;
      };
      radioLabels: {
        false: {
          [L in Language]: string;
        };
        true: {
          [L in Language]: string;
        };
      };
      remove: {
        [L in Language]: string;
      };
      required: {
        [L in Language]: string;
      };
      reset: {
        [L in Language]: string;
      };
      submit: {
        [L in Language]: string;
      };
    };
    months: {
      april: {
        [L in Language]: string;
      };
      august: {
        [L in Language]: string;
      };
      december: {
        [L in Language]: string;
      };
      february: {
        [L in Language]: string;
      };
      january: {
        [L in Language]: string;
      };
      july: {
        [L in Language]: string;
      };
      june: {
        [L in Language]: string;
      };
      march: {
        [L in Language]: string;
      };
      may: {
        [L in Language]: string;
      };
      november: {
        [L in Language]: string;
      };
      october: {
        [L in Language]: string;
      };
      september: {
        [L in Language]: string;
      };
    };
    notifications: {
      types: {
        error: {
          [L in Language]: string;
        };
        info: {
          [L in Language]: string;
        };
        success: {
          [L in Language]: string;
        };
        warning: {
          [L in Language]: string;
        };
      };
    };
    pagination: {
      next: {
        [L in Language]: string;
      };
      previous: {
        [L in Language]: string;
      };
    };
    searchBar: {
      placeholder: {
        [L in Language]: string;
      };
    };
  };
}

export type ExtractTranslationKey<T extends { [key: string]: any }, Key = keyof T> = Key extends string
  ? T[Key] extends { [key: string]: any }
    ? T[Key] extends { [K in Language]: string }
      ? Key
      : `${Key}.${ExtractTranslationKey<T[Key]>}`
    : `${Key}`
  : never;

export type TranslationNamespace = Extract<keyof Translations, string>;

export type TranslationKey<TNamespace> = TNamespace extends TranslationNamespace
  ? ExtractTranslationKey<Translations[TNamespace]>
  : ExtractTranslationKey<Translations>;

export type TranslateFunction<TNamespace> = (key: TranslationKey<TNamespace>) => string;
