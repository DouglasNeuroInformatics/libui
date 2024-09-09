import { createContext, useState } from 'react';

import libui from '@/i18n/translations/libui.json';

import type { Language, Translations } from '../i18n';

type TranslationContextType = {
  changeLanguage: (language: Language) => void;
  defaultLanguage: Language;
  resolvedLanguage: Language;
  translations: Translations;
};

export const TranslationContext = createContext<TranslationContextType>({
  changeLanguage: () => {
    console.error(`Cannot change language without parent TranslationContextProvider`);
    return;
  },
  defaultLanguage: 'en',
  resolvedLanguage: 'en',
  translations: {
    libui
  }
});

export const TranslationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resolvedLanguage, setResolvedLanguage] = useState<Language>('en');
  return (
    <TranslationContext.Provider
      value={{
        changeLanguage: (language) => setResolvedLanguage(language),
        defaultLanguage: 'en',
        resolvedLanguage,
        translations: { libui }
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
