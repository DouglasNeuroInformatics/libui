import { createContext } from 'react';

import type { DataTableStoreApi } from './store.ts';

export const DataTableContext = createContext<{ store: DataTableStoreApi }>(null!);
