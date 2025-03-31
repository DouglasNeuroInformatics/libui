import type { Dispatch, SetStateAction } from 'react';

import { useStorage } from './useStorage';

import type { UseStorageOptions } from './useStorage';

/** Custom hook that uses local storage to persist state across page reloads */
export function useLocalStorage<T>(
  key: string,
  initialValue: (() => T) | T,
  options: UseStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] {
  return useStorage(key, initialValue, 'localStorage', options);
}
