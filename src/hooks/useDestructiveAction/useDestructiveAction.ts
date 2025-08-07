import { useCallback } from 'react';

import type { Promisable } from 'type-fest';

import { useDestructiveActionStore } from './useDestructiveActionStore';

export function useDestructiveAction<TArgs extends any[]>(destructiveAction: (...args: TArgs) => Promisable<void>) {
  const addPendingDestructiveAction = useDestructiveActionStore((store) => store.addPendingDestructiveAction);
  return useCallback(
    (...args: TArgs) => {
      addPendingDestructiveAction(() => destructiveAction(...args));
    },
    [destructiveAction, addPendingDestructiveAction]
  );
}
