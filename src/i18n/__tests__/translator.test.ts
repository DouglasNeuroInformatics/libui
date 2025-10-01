import { describe, expect, it, vi } from 'vitest';

import { Translator } from '../translator';

describe('Translator', () => {
  const translator = new Translator();

  it('should initially not be initialized', () => {
    expect(translator.isInitialized).toBe(false);
  });

  it('should not allow accessing the changeLanguage method before initialization', () => {
    expect(() => translator.changeLanguage('fr')).toThrow(
      "Cannot access method 'changeLanguage' of Translator instance before initialization"
    );
  });

  it('should not allow accessing the resolvedLanguage method before initialization', () => {
    expect(() => translator.resolvedLanguage).toThrow(
      "Cannot access getter 'resolvedLanguage' of Translator instance before initialization"
    );
  });

  it('should allow initialization', () => {
    translator.init({ defaultLanguage: 'en', translations: {} });
    expect(translator.isInitialized).toBe(true);
  });

  it('should not allow reinitialization', () => {
    expect(() => translator.init({ defaultLanguage: 'en', translations: {} })).toThrow(
      'Cannot reinitialize Translator'
    );
  });

  it('should have set the document language to en', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  it('should allow accessing translations', () => {
    expect(translator.t('libui.days.monday')).toBe('Monday');
    expect(translator.t({ en: 'Yes', fr: 'Oui' })).toBe('Yes');
  });

  it('should allow changing the language', () => {
    translator.changeLanguage('fr');
    expect(translator.resolvedLanguage).toBe('fr');
    expect(document.documentElement.getAttribute('lang')).toBe('fr');
    expect(translator.t('libui.days.monday')).toBe('Lundi');
    expect(translator.t({ en: 'Yes', fr: 'Oui' })).toBe('Oui');
  });

  it('should return the language from the defaultLanguage, if the resolvedLanguage is unavailable', () => {
    expect(translator.resolvedLanguage).toBe('fr');
    expect(translator.t({ en: 'Yes' })).toBe('Yes');
  });

  it('should return an empty string if no translation is available', () => {
    vi.spyOn(console, 'error').mockImplementationOnce(() => undefined);
    expect(translator.t({})).toBe('');
    expect(console.error).toHaveBeenLastCalledWith("Failed to extract translation from object '{}'");
    vi.restoreAllMocks();
  });

  it('should allow adding and removing event listeners', () => {
    const handleLanguageChange1 = vi.fn();
    const handleLanguageChange2 = vi.fn();
    translator.addEventListener('languageChange', handleLanguageChange1);
    translator.addEventListener('languageChange', handleLanguageChange2);
    translator.changeLanguage('en');
    expect(translator.removeEventListener('languageChange', handleLanguageChange1)).toBe(true);
    translator.changeLanguage('fr');
    expect(translator.removeEventListener('languageChange', handleLanguageChange2)).toBe(true);
    expect(handleLanguageChange1).toHaveBeenCalledTimes(1);
    expect(handleLanguageChange2).toHaveBeenCalledTimes(2);
  });

  it('should apply arguments', () => {
    expect(translator.t({ en: 'Hello, {}' }, { args: ['World'] })).toBe('Hello, World');
    expect(
      translator.t(
        { en: 'Hello, {}', fr: 'Bonjour, {}' },
        {
          args: {
            en: ['World'],
            fr: ['tout le monde']
          }
        }
      )
    ).toBe('Bonjour, tout le monde');
  });

  it('should handle SSR environment where document is undefined', () => {
    const ssrTranslator = new Translator();
    const originalDocument = global.document;

    // Simulate SSR environment
    // @ts-expect-error - deliberately setting document to undefined for SSR test
    delete global.document;

    expect(() => {
      ssrTranslator.init({ defaultLanguage: 'en', translations: {} });
    }).not.toThrow();

    expect(() => {
      ssrTranslator.changeLanguage('fr');
    }).not.toThrow();

    expect(ssrTranslator.resolvedLanguage).toBe('fr');
    expect(ssrTranslator.t('libui.days.monday')).toBe('Lundi');

    // Restore document
    global.document = originalDocument;
  });
});
