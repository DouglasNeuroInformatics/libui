import { useEffect, useRef } from 'react';

import type { RowData } from '@tanstack/table-core';

import { DataTableContext } from './context.ts';
import { DataTableContent } from './DataTableContent.tsx';
import { createDataTableStore } from './store.ts';

import type { DataTableProps } from './types.ts';

export const DataTable = <T extends RowData>({
  disableSearch,
  emptyStateProps,
  onRowClick,
  onRowDoubleClick,
  onSearchChange,
  rootStyle,
  togglesComponent,
  ...props
}: DataTableProps<T>) => {
  const storeRef = useRef(createDataTableStore(props));

  const { columnBreakpoints, columns, data, meta, mode, rowActions, tableName } = props;
  const pageCount = props.mode === 'server' ? props.pageCount : undefined;
  const onPaginationChange = props.mode === 'server' ? props.onPaginationChange : undefined;
  const onSortingChange = props.mode === 'server' ? props.onSortingChange : undefined;

  useEffect(() => {
    const { reset } = storeRef.current.getState();
    reset(props);
    // Depends on the individual values `reset` consumes rather than on `props`, which is a fresh
    // rest-spread object on every render and would therefore reset the store on every render.
    // `initialState` is deliberately absent: it is applied once, when the store is created.
  }, [
    columnBreakpoints,
    columns,
    data,
    meta,
    mode,
    onPaginationChange,
    onSortingChange,
    pageCount,
    rowActions,
    tableName
  ]);

  return (
    <DataTableContext.Provider value={{ store: storeRef.current }}>
      <DataTableContent
        disableSearch={disableSearch}
        emptyStateProps={emptyStateProps}
        rootStyle={rootStyle}
        togglesComponent={togglesComponent}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        onSearchChange={onSearchChange}
      />
    </DataTableContext.Provider>
  );
};

export type {
  DataTableColumnBreakpoints,
  DataTableProps,
  DataTableRootStyle,
  DataTableRowAction,
  DataTableSearchChangeHandler
} from './types.ts';

export * as TanstackTable from '@tanstack/table-core';
