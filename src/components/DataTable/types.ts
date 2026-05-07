import type React from 'react';

import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  GlobalFilter,
  HeaderGroup,
  PaginationState,
  Row,
  RowData,
  SortingState,
  Table,
  TableMeta
} from '@tanstack/table-core';
import type { Promisable, Simplify } from 'type-fest';

import type { MEMOIZED_HANDLE_ID, ROW_ACTIONS_METADATA_KEY, TABLE_NAME_METADATA_KEY } from './constants.ts';
import type { DataTableEmptyStateProps } from './DataTableEmptyState.tsx';

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

/*********************************************************************
 * BASE
 *********************************************************************/

export type BaseDataTableStoreParams<T extends RowData> = {
  columnBreakpoints?: DataTableColumnBreakpoints;
  columns: ColumnDef<NoInfer<T>>[];
  data: T[];
  meta?: TableMeta<NoInfer<T>>;
  rowActions?: DataTableRowAction<NoInfer<T>>[];
  tableName?: string;
};

export type DataTableColumnBreakpoints = {
  0: number;
  512: number;
  768: number;
  1024: number;
  1280: number;
};

export type DataTableContentProps<T extends RowData> = {
  emptyStateProps?: Partial<DataTableEmptyStateProps>;
  onRowClick?: (row: T) => Promisable<void>;
  onRowDoubleClick?: (row: T) => Promisable<void>;
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

export type MemoizedHandle<T extends (...args: any[]) => any> = T & {
  invalidate(): void;
  [MEMOIZED_HANDLE_ID]: symbol;
};

export type SearchChangeHandler<T = any> = (value: string, table: Table<T>) => void;

/*********************************************************************
 * CLIENT
 *********************************************************************/

export type ClientDataTableInitialState = {
  columnFilters?: ColumnFiltersState;
  columnPinning?: ColumnPinningState;
  sorting?: SortingState;
};

export type ClientDataTableStoreParams<T extends RowData> = Simplify<
  BaseDataTableStoreParams<T> & {
    initialState?: ClientDataTableInitialState;
  }
>;

export type ClientDataTableProps<T extends RowData> = Simplify<
  ClientDataTableStoreParams<T> & DataTableContentProps<T>
>;

/*********************************************************************
 * SERVER
 *********************************************************************/

export type ServerDataTableStoreParams<T extends RowData> = Simplify<
  BaseDataTableStoreParams<T> & {
    initialState?: never;
    onPaginationChange: (state: PaginationState) => void;
    onSortingChange?: (state: SortingState) => void;
    pageCount: number;
  }
>;

export type ServerDataTableProps<T extends RowData> = DataTableContentProps<T> & ServerDataTableStoreParams<T>;

/*********************************************************************
 * COMMON
 *********************************************************************/

export type AnyDataTableStoreParams<T extends RowData = any> =
  | ClientDataTableStoreParams<T>
  | ServerDataTableStoreParams<T>;

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
  reset: (params: AnyDataTableStoreParams) => void;
  setContainerWidth: (containerWidth: number) => void;
  setGlobalFilter: (globalFilter: GlobalFilter) => void;
  setPageIndex: (index: number) => void;
  style: React.CSSProperties;
};
