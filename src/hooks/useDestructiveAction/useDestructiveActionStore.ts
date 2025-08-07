import type { Promisable } from 'type-fest';
import { create } from 'zustand';

export type DestructiveAction = () => Promisable<void>;

export type DestructiveActionStore = {
  addPendingDestructiveAction: (action: DestructiveAction) => void;
  deletePendingDestructiveAction: (action: DestructiveAction) => void;
  pendingDestructiveActions: DestructiveAction[];
};

export const useDestructiveActionStore = create<DestructiveActionStore>((set) => ({
  addPendingDestructiveAction: (action) => {
    set((state) => ({
      pendingDestructiveActions: [...state.pendingDestructiveActions, action]
    }));
  },
  deletePendingDestructiveAction: (action) => {
    set((state) => ({
      ...state,
      pendingDestructiveActions: state.pendingDestructiveActions.filter((_action) => _action !== action)
    }));
  },
  pendingDestructiveActions: []
}));
