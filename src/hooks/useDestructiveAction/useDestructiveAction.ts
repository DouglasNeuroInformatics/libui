import { useCallback } from 'react';

import { useDestructiveActionStore } from './useDestructiveActionStore';

import type { DestructiveAction, DestructiveActionParams } from './useDestructiveActionStore';

export function useDestructiveAction<TArgs extends any[]>(action: DestructiveAction<TArgs>): (...args: TArgs) => void;
export function useDestructiveAction<TArgs extends any[]>(
  params: DestructiveActionParams<TArgs>
): (...args: TArgs) => void;
export function useDestructiveAction<TArgs extends any[]>(
  arg: DestructiveAction<TArgs> | DestructiveActionParams<TArgs>
): (...args: TArgs) => void {
  const addPendingDestructiveAction = useDestructiveActionStore((store) => store.addPendingDestructiveAction);
  return useCallback(
    (...args: TArgs) => {
      const { action, ...options } = typeof arg === 'function' ? { action: arg } : arg;
      addPendingDestructiveAction(() => action(...args), options);
    },
    [arg, addPendingDestructiveAction]
  );
}
