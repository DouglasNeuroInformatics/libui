import { createContext } from 'react';

import type { DataTableStoreApi } from './store';

export const DataTableContext = createContext<{ store: DataTableStoreApi }>(null!);
