import type { Dispatch, SetStateAction } from 'react';

import { useStorage } from './useStorage';

import type { UseStorageOptions } from './useStorage';

/** Custom hook that uses session storage to persist state across page reloads */
export function useSessionStorage<T>(
  key: string,
  initialValue: (() => T) | T,
  options: UseStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] {
  return useStorage(key, initialValue, 'sessionStorage', options);
}
