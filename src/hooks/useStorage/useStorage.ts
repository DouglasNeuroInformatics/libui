import { useCallback, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { isBrowser } from '@/utils';

import { useEventCallback } from '../useEventCallback';
import { useEventListener } from '../useEventListener';

type StorageName = 'localStorage' | 'sessionStorage';

type StorageEventMap = {
  [K in StorageName]: CustomEvent;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
  interface WindowEventMap extends StorageEventMap {}
}

/**
 * Represents the options for customizing the behavior of serialization and deserialization.
 * @template T - The type of the state to be stored in storage.
 */
type UseStorageOptions<T> = {
  /** A function to deserialize the stored value. */
  deserializer?: (value: string) => T;
  /**
   * If `true` (default), the hook will initialize reading the storage. In SSR, you should set it to `false`, returning the initial value initially.
   * @default true
   */
  initializeWithValue?: boolean;
  /** A function to serialize the value before storing it. */
  serializer?: (value: T) => string;
};

/**
 * Custom hook that uses local or session storage to persist state across page reloads.
 * @template T - The type of the state to be stored in storage.
 * @param key - The key under which the value will be stored in  storage.
 * @param initialValue - The initial value of the state or a function that returns the initial value.
 * @param options - Options for customizing the behavior of serialization and deserialization (optional).
 * @returns A tuple containing the stored value and a function to set the value.
 * @public
 * @example
 * ```tsx
 * const [count, setCount] = useStorage('count', 0);
 * // Access the `count` value and the `setCount` function to update it.
 * ```
 */
export function useStorage<T>(
  key: string,
  initialValue: (() => T) | T,
  storageName: StorageName,
  options: UseStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] {
  const { initializeWithValue = true } = options;
  const storage = window[storageName];

  const serializer = useCallback<(value: T) => string>(
    (value) => {
      if (options.serializer) {
        return options.serializer(value);
      }
      return JSON.stringify(value);
    },
    [options]
  );

  const deserializer = useCallback<(value: string) => T>(
    (value) => {
      if (options.deserializer) {
        return options.deserializer(value);
      } else if (value === 'undefined') {
        return undefined as unknown as T;
      }
      const defaultValue = initialValue instanceof Function ? initialValue() : initialValue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch (err) {
        console.error(`Error parsing JSON: ${(err as Error).message}`);
        return defaultValue;
      }
      return parsed as T;
    },
    [options, initialValue]
  );

  const readValue = useCallback((): T => {
    const initialValueToUse = initialValue instanceof Function ? initialValue() : initialValue;
    if (!isBrowser()) {
      return initialValueToUse;
    }
    const raw = storage.getItem(key);
    return raw ? deserializer(raw) : initialValueToUse;
  }, [initialValue, key, deserializer]);

  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  const setValue: Dispatch<SetStateAction<T>> = useEventCallback((value) => {
    if (!isBrowser()) {
      console.warn(`Tried setting storage key “${key}” even though environment is not a client`);
    }
    try {
      const newValue = value instanceof Function ? value(readValue()) : value;
      storage.setItem(key, serializer(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new StorageEvent(storageName, { key }));
    } catch (error) {
      console.warn(`Error setting storage key “${key}”:`, error);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  const handleStorageChange = useCallback(
    (event: CustomEvent | StorageEvent) => {
      if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange);

  useEventListener(storageName, handleStorageChange);

  return [storedValue, setValue];
}

export type { StorageName, UseStorageOptions };
