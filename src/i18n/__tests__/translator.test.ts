import { describe, expect, it } from 'vitest';

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
});
