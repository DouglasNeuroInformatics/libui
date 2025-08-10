import type { Promisable } from 'type-fest';
import { create } from 'zustand';

type DestructiveAction<TArgs extends any[] = any[]> = (...args: TArgs) => Promisable<void>;

type DestructiveActionOptions = {
  description?: string;
  title?: string;
};

type DestructiveActionParams<TArgs extends any[] = any[]> = DestructiveActionOptions & {
  action: DestructiveAction<TArgs>;
};

type DestructiveActionDef<TArgs extends any[] = any[]> = DestructiveActionParams<TArgs> & {
  id: string;
};

export type DestructiveActionStore = {
  addPendingDestructiveAction: (action: DestructiveAction, options?: DestructiveActionOptions) => void;
  deletePendingDestructiveAction: (id: string) => void;
  pendingDestructiveActions: DestructiveActionDef[];
};

export const useDestructiveActionStore = create<DestructiveActionStore>((set) => ({
  addPendingDestructiveAction: (action, options) => {
    set((state) => ({
      pendingDestructiveActions: [...state.pendingDestructiveActions, { action, id: crypto.randomUUID(), ...options }]
    }));
  },
  deletePendingDestructiveAction: (id) => {
    set((state) => ({
      ...state,
      pendingDestructiveActions: state.pendingDestructiveActions.filter((def) => def.id !== id)
    }));
  },
  pendingDestructiveActions: []
}));

export type { DestructiveAction, DestructiveActionOptions, DestructiveActionParams };
