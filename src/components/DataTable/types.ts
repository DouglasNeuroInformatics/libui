import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  GlobalFilter,
  HeaderGroup,
  Row,
  RowData,
  SortingState,
  Table,
  TableMeta
} from '@tanstack/table-core';
import type { Promisable } from 'type-fest';

import type { MEMOIZED_HANDLE_ID, ROW_ACTIONS_METADATA_KEY, TABLE_NAME_METADATA_KEY } from './constants';
import type { DataTableEmptyStateProps } from './DataTableEmptyState';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars
  export interface ColumnMeta<TData, TValue> {
    [key: string]: unknown;
  }

  export type GlobalFilter = string | undefined;

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface TableMeta<TData extends RowData> {
    [key: string]: unknown;
    [ROW_ACTIONS_METADATA_KEY]?: DataTableRowAction<TData>[];
    [TABLE_NAME_METADATA_KEY]?: string;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface TableState {
    globalFilter: GlobalFilter;
  }
}

export type DataTableInitialState = {
  columnFilters?: ColumnFiltersState;
  columnPinning?: ColumnPinningState;
  sorting?: SortingState;
};

export type DataTableProps<T extends RowData> = DataTableContentProps<T> & DataTableStoreParams<T>;

export type DataTableContentProps<T extends RowData> = {
  emptyStateProps?: Partial<DataTableEmptyStateProps>;
  onSearchChange?: SearchChangeHandler<NoInfer<T>>;
  togglesComponent?: React.FC<{ table: Table<T> }>;
};

export type DataTableHandles<T extends { [key: string]: unknown }> = {
  [K in keyof T]: MemoizedHandle<() => T[K]>;
};

export type DataTableRowAction<T extends RowData> = {
  destructive?: boolean;
  disabled?: ((row: T) => boolean) | boolean;
  label: string;
  onSelect: (row: T, table: Table<T>) => Promisable<void>;
};

export type DataTableStore = {
  $handles: DataTableHandles<{
    headerGroups: HeaderGroup<any>[];
    paginationInfo: {
      pageCount: number;
      pageIndex: number;
    };
    rowCount: number;
    rows: Row<any>[];
    table: Table<any>;
    tableMeta: TableMeta<any>;
  }>;
  _containerWidth: null | number;
  _key: symbol;
  reset: (params: DataTableStoreParams<any>) => void;
  setContainerWidth: (containerWidth: number) => void;
  setGlobalFilter: (globalFilter: GlobalFilter) => void;
  setPageIndex: (index: number) => void;
  style: React.CSSProperties;
};

export type DataTableStoreParams<T extends RowData> = {
  columns: ColumnDef<NoInfer<T>>[];
  data: T[];
  initialState?: DataTableInitialState;
  meta?: TableMeta<NoInfer<T>>;
  rowActions?: DataTableRowAction<NoInfer<T>>[];
  tableName?: string;
};

export type MemoizedHandle<T extends (...args: any[]) => any> = T & {
  invalidate(): void;
  [MEMOIZED_HANDLE_ID]: symbol;
};

export type SearchChangeHandler<T = any> = (value: string, table: Table<T>) => void;
