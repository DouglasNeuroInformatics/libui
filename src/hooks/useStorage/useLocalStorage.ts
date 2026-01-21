import type { Dispatch, SetStateAction } from 'react';

import { useStorage } from './useStorage.ts';

import type { UseStorageOptions } from './useStorage.ts';

/** Custom hook that uses local storage to persist state across page reloads */
export function useLocalStorage<T>(
  key: string,
  initialValue: (() => T) | T,
  options: UseStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] {
  return useStorage(key, initialValue, 'localStorage', options);
}
