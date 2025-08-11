import { useCallback } from 'react';

import { useDestructiveActionStore } from './useDestructiveActionStore';

import type { DestructiveAction, DestructiveActionOptions, DestructiveActionParams } from './useDestructiveActionStore';

/**
 * Returns a function that accepts a destructive action and optional configuration.
 * @returns A function that takes an action and options to add to the destructive action queue
 */
export function useDestructiveAction(): (action: DestructiveAction, options?: DestructiveActionOptions) => void;
/**
 * Returns a function that wraps the provided action for destructive confirmation.
 * @param action - The destructive action to wrap
 * @returns A function that takes the action's arguments and adds it to the destructive action queue
 */
export function useDestructiveAction<TArgs extends any[]>(action: DestructiveAction<TArgs>): (...args: TArgs) => void;
/**
 * Returns a function that wraps the provided action with configuration for destructive confirmation.
 * @param params - The action and its configuration (title, description)
 * @returns A function that takes the action's arguments and adds it to the destructive action queue
 */
export function useDestructiveAction<TArgs extends any[]>(
  params: DestructiveActionParams<TArgs>
): (...args: TArgs) => void;
export function useDestructiveAction<TArgs extends any[]>(
  arg?: DestructiveAction<TArgs> | DestructiveActionParams<TArgs>
): (...args: TArgs) => void {
  const addPendingDestructiveAction = useDestructiveActionStore((store) => store.addPendingDestructiveAction);
  return useCallback(
    (...args: TArgs) => {
      if (arg === undefined) {
        const [action, options] = args as unknown as [DestructiveAction, DestructiveActionOptions | undefined];
        addPendingDestructiveAction(action, options);
        return;
      }
      const { action, ...options } = typeof arg === 'function' ? { action: arg } : arg;
      addPendingDestructiveAction(() => action(...args), options);
    },
    [arg, addPendingDestructiveAction]
  );
}
