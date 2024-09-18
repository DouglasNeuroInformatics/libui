import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mockStorage } from '@/testing/mocks';
import { isBrowser } from '@/utils';

import { useStorage } from './useStorage';

import type { StorageName } from './useStorage';

const storages: StorageName[] = ['localStorage', 'sessionStorage'];
storages.forEach(mockStorage);

vi.mock('@/utils', () => ({ isBrowser: vi.fn(() => true) }));

describe('useStorage()', () => {
  storages.forEach((storageName) => {
    const storage = window[storageName];

    beforeEach(() => {
      window[storageName].clear();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });
    it('should return the initial state if running on the server', () => {
      vi.mocked(isBrowser).mockReturnValue(false);
      const { result } = renderHook(() => useStorage('key', 'value', storageName));
      expect(result.current[0]).toBe('value');
    });

    it('should return the initial state if using a string', () => {
      const { result } = renderHook(() => useStorage('key', 'value', storageName));
      expect(result.current[0]).toBe('value');
    });

    it('return the initial state return if using a callback function', () => {
      const { result } = renderHook(() => useStorage('key', () => 'value', storageName));
      expect(result.current[0]).toBe('value');
    });

    it('return the initial state if using a string', () => {
      const { result } = renderHook(() => useStorage('digits', [1, 2], storageName));
      expect(result.current[0]).toEqual([1, 2]);
    });

    it('return the initial state if it is a map', () => {
      const { result } = renderHook(() => useStorage('map', new Map([['a', 1]]), storageName));
      expect(result.current[0]).toEqual(new Map([['a', 1]]));
    });

    it('return the initial state if it is a set', () => {
      const { result } = renderHook(() => useStorage('set', new Set([1, 2]), storageName));
      expect(result.current[0]).toEqual(new Set([1, 2]));
    });

    it('return the initial state if it is a date', () => {
      const { result } = renderHook(() => useStorage('date', new Date(2020, 1, 1), storageName));
      expect(result.current[0]).toEqual(new Date(2020, 1, 1));
    });

    it('should update the state and write to session storage', () => {
      const { result } = renderHook(() => useStorage('key', 'value', storageName));
      act(() => {
        const setState = result.current[1];
        setState('edited');
      });
      expect(result.current[0]).toBe('edited');
      expect(storage.getItem('key')).toBe(JSON.stringify('edited'));
    });

    it('should update the state with undefined', () => {
      const { result } = renderHook(() => useStorage<string | undefined>('keytest', 'value', storageName));
      act(() => {
        const setState = result.current[1];
        setState(undefined);
      });
      expect(result.current[0]).toBeUndefined();
    });

    it('should update the state with a callback function', () => {
      const { result } = renderHook(() => useStorage('count', 2, storageName));
      act(() => {
        const setState = result.current[1];
        setState((prev) => prev + 1);
      });
      expect(result.current[0]).toBe(3);
      expect(storage.getItem('count')).toEqual('3');
    });

    it('should update the state with a callback function multiple times per render', () => {
      const { result } = renderHook(() => useStorage('count', 2, storageName));
      act(() => {
        const setState = result.current[1];
        setState((prev) => prev + 1);
        setState((prev) => prev + 1);
        setState((prev) => prev + 1);
      });
      expect(result.current[0]).toBe(5);
      expect(storage.getItem('count')).toEqual('5');
    });

    it('should update if another hook updates the same key', () => {
      const initialValues: [string, unknown] = ['key', 'initial'];
      const { result: A } = renderHook(() => useStorage(...initialValues, storageName));
      const { result: B } = renderHook(() => useStorage(...initialValues, storageName));
      const { result: C } = renderHook(() => useStorage('other-key', 'initial', storageName));

      act(() => {
        const setState = A.current[1];
        setState('edited');
      });

      expect(B.current[0]).toBe('edited');
      expect(C.current[0]).toBe('initial');
    });

    it('should not update if another hook updates a different key', () => {
      let renderCount = 0;
      const { result: A } = renderHook(() => {
        renderCount++;
        return useStorage('key1', {}, storageName);
      });
      const { result: B } = renderHook(() => useStorage('key2', 'initial', storageName));
      expect(renderCount).toBe(1);
      act(() => {
        const setStateA = A.current[1];
        setStateA({ a: 1 });
      });
      expect(renderCount).toBe(2);
      act(() => {
        const setStateB = B.current[1];
        setStateB('edited');
      });
      expect(renderCount).toBe(2);
    });

    it('should return a referentially stable setter', () => {
      const { result } = renderHook(() => useStorage('count', 1, storageName));
      const originalCallback = result.current[1];
      act(() => {
        const setState = result.current[1];
        setState((prev) => prev + 1);
      });
      expect(result.current[1] === originalCallback).toBe(true);
    });

    it('should use the default JSON.stringify and JSON.parse when serializer/deserializer are not provided', () => {
      const { result } = renderHook(() => useStorage('key', 'initialValue', storageName));
      act(() => {
        result.current[1]('newValue');
      });
      expect(storage.getItem('key')).toBe(JSON.stringify('newValue'));
    });

    it('should write to stderr and set the store to the initial value if the stored value in not serializable', () => {
      vi.spyOn(console, 'error');
      storage.setItem('key', '{{ x: foo }}');
      renderHook(() => useStorage('key', 'initialValue', storageName));
      expect(console.error).toHaveBeenLastCalledWith(expect.stringContaining('Error parsing JSON'));
    });

    it('should use a custom serializer and deserializer when provided', () => {
      const serializer = (value: string) => value.toUpperCase();
      const deserializer = (value: string) => value.toLowerCase();
      const { result } = renderHook(() => useStorage('key', 'initialValue', storageName, { deserializer, serializer }));
      act(() => {
        result.current[1]('NewValue');
      });
      expect(storage.getItem('key')).toBe('NEWVALUE');
    });

    it('should handle undefined values with custom deserializer', () => {
      const serializer = (value: number | undefined) => String(value);
      const deserializer = (value: string) => (value === 'undefined' ? undefined : Number(value));
      const { result } = renderHook(() =>
        useStorage<number | undefined>('key', 0, storageName, {
          deserializer,
          serializer
        })
      );
      act(() => {
        result.current[1](undefined);
      });
      expect(storage.getItem('key')).toBe('undefined');
      act(() => {
        result.current[1](42);
      });
      expect(storage.getItem('key')).toBe('42');
    });
  });
});
