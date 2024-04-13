import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mockStorage } from '../testing/mocks.js';
import { isBrowser } from '../utils.js';
import { useSessionStorage } from './useSessionStorage.js';

mockStorage('sessionStorage');

vi.mock('../utils.js', () => ({ isBrowser: vi.fn(() => true) }));

describe('useSessionStorage()', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the initial state if running on the server', () => {
    vi.mocked(isBrowser).mockReturnValue(false);
    const { result } = renderHook(() => useSessionStorage('key', 'value'));
    expect(result.current[0]).toBe('value');
  });

  it('should return the initial state if using a string', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'value'));
    expect(result.current[0]).toBe('value');
  });

  it('return the initial state return if using a callback function', () => {
    const { result } = renderHook(() => useSessionStorage('key', () => 'value'));
    expect(result.current[0]).toBe('value');
  });

  it('return the initial state if using a string', () => {
    const { result } = renderHook(() => useSessionStorage('digits', [1, 2]));
    expect(result.current[0]).toEqual([1, 2]);
  });

  it('return the initial state if it is a map', () => {
    const { result } = renderHook(() => useSessionStorage('map', new Map([['a', 1]])));
    expect(result.current[0]).toEqual(new Map([['a', 1]]));
  });

  it('return the initial state if it is a set', () => {
    const { result } = renderHook(() => useSessionStorage('set', new Set([1, 2])));
    expect(result.current[0]).toEqual(new Set([1, 2]));
  });

  it('return the initial state if it is a date', () => {
    const { result } = renderHook(() => useSessionStorage('date', new Date(2020, 1, 1)));
    expect(result.current[0]).toEqual(new Date(2020, 1, 1));
  });

  it('should update the state and write to session storage', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'value'));
    act(() => {
      const setState = result.current[1];
      setState('edited');
    });
    expect(result.current[0]).toBe('edited');
    expect(window.sessionStorage.getItem('key')).toBe(JSON.stringify('edited'));
  });

  it('should update the state with undefined', () => {
    const { result } = renderHook(() => useSessionStorage<string | undefined>('keytest', 'value'));
    act(() => {
      const setState = result.current[1];
      setState(undefined);
    });
    expect(result.current[0]).toBeUndefined();
  });

  it('should update the state with a callback function', () => {
    const { result } = renderHook(() => useSessionStorage('count', 2));
    act(() => {
      const setState = result.current[1];
      setState((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(3);
    expect(window.sessionStorage.getItem('count')).toEqual('3');
  });

  it('should update the state with a callback function multiple times per render', () => {
    const { result } = renderHook(() => useSessionStorage('count', 2));
    act(() => {
      const setState = result.current[1];
      setState((prev) => prev + 1);
      setState((prev) => prev + 1);
      setState((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(5);
    expect(window.sessionStorage.getItem('count')).toEqual('5');
  });

  it('should update if another hook updates the same key', () => {
    const initialValues: [string, unknown] = ['key', 'initial'];
    const { result: A } = renderHook(() => useSessionStorage(...initialValues));
    const { result: B } = renderHook(() => useSessionStorage(...initialValues));
    const { result: C } = renderHook(() => useSessionStorage('other-key', 'initial'));

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
      return useSessionStorage('key1', {});
    });
    const { result: B } = renderHook(() => useSessionStorage('key2', 'initial'));
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
    const { result } = renderHook(() => useSessionStorage('count', 1));
    const originalCallback = result.current[1];
    act(() => {
      const setState = result.current[1];
      setState((prev) => prev + 1);
    });
    expect(result.current[1] === originalCallback).toBe(true);
  });

  it('should use the default JSON.stringify and JSON.parse when serializer/deserializer are not provided', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'initialValue'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(sessionStorage.getItem('key')).toBe(JSON.stringify('newValue'));
  });

  it('should write to stderr and set the store to the initial value if the stored value in not serializable', () => {
    vi.spyOn(console, 'error');
    window.sessionStorage.setItem('key', '{{ x: foo }}');
    renderHook(() => useSessionStorage('key', 'initialValue'));
    expect(console.error).toHaveBeenLastCalledWith(expect.stringContaining('Error parsing JSON'));
  });

  it('should use a custom serializer and deserializer when provided', () => {
    const serializer = (value: string) => value.toUpperCase();
    const deserializer = (value: string) => value.toLowerCase();
    const { result } = renderHook(() => useSessionStorage('key', 'initialValue', { deserializer, serializer }));
    act(() => {
      result.current[1]('NewValue');
    });
    expect(sessionStorage.getItem('key')).toBe('NEWVALUE');
  });

  it('should handle undefined values with custom deserializer', () => {
    const serializer = (value: number | undefined) => String(value);
    const deserializer = (value: string) => (value === 'undefined' ? undefined : Number(value));
    const { result } = renderHook(() =>
      useSessionStorage<number | undefined>('key', 0, {
        deserializer,
        serializer
      })
    );
    act(() => {
      result.current[1](undefined);
    });
    expect(sessionStorage.getItem('key')).toBe('undefined');
    act(() => {
      result.current[1](42);
    });
    expect(sessionStorage.getItem('key')).toBe('42');
  });
});
