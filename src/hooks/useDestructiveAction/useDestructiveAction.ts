import { useCallback } from 'react';

import { useDestructiveActionStore } from './useDestructiveActionStore';

import type { DestructiveAction } from './useDestructiveActionStore';

export function useDestructiveAction(destructiveAction: DestructiveAction) {
  const addPendingDestructiveAction = useDestructiveActionStore((store) => store.addPendingDestructiveAction);
  return useCallback(() => {
    addPendingDestructiveAction(destructiveAction);
  }, [destructiveAction, addPendingDestructiveAction]);
}
