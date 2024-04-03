import { vi } from 'vitest';

/**
 * Mocks the matchMedia API
 * @param {boolean} matches - whether the media query matches
 * @example
 * mockMatchMedia(false)
 */
export const mockMatchMedia = (matches: ((query: string) => boolean) | boolean): void => {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: typeof matches === 'boolean' ? matches : matches(query),
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn()
  }));
};

/**
 * Mocks the Storage API
 * @param {'localStorage' | 'sessionStorage'} name - The name of the storage to mock
 * @example
 * mockStorage('localStorage')
 * // Then use window.localStorage as usual (it will be mocked)
 */
export const mockStorage = (name: 'localStorage' | 'sessionStorage'): void => {
  class StorageMock implements Omit<Storage, 'key' | 'length'> {
    store: { [key: string]: string } = {};

    clear() {
      this.store = {};
    }

    getItem(key: string) {
      return this.store[key] || null;
    }

    removeItem(key: string) {
      delete this.store[key];
    }

    setItem(key: string, value: unknown) {
      this.store[key] = String(value) + '';
    }
  }

  Object.defineProperty(window, name, {
    value: new StorageMock()
  });
};
