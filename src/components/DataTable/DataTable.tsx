import { useEffect, useRef } from 'react';

import type { RowData } from '@tanstack/table-core';

import { DataTableContext } from './context';
import { DataTableContent } from './DataTableContent';
import { createDataTableStore } from './store';

import type { DataTableProps } from './types';

export const DataTable = <T extends RowData>({
  emptyStateProps,
  onSearchChange,
  togglesComponent,
  ...props
}: DataTableProps<T>) => {
  const storeRef = useRef(createDataTableStore(props));

  useEffect(() => {
    const { reset } = storeRef.current.getState();
    reset(props);
  }, [props]);

  return (
    <DataTableContext.Provider value={{ store: storeRef.current }}>
      <DataTableContent
        emptyStateProps={emptyStateProps}
        togglesComponent={togglesComponent}
        onSearchChange={onSearchChange}
      />
    </DataTableContext.Provider>
  );
};
