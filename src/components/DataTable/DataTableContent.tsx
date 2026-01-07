import type { RowData } from '@tanstack/table-core';

import { TABLE_NAME_METADATA_KEY } from './constants';
import { DataTableBody } from './DataTableBody';
import { DataTableControls } from './DataTableControls';
import { DataTableHead } from './DataTableHead';
import { DataTablePagination } from './DataTablePagination';
import { useContainerRef, useDataTableHandle, useDataTableStore } from './hooks';

import type { DataTableContentProps } from './types';

export const DataTableContent = <T extends RowData>({
  emptyStateProps,
  onSearchChange,
  togglesComponent
}: DataTableContentProps<T>) => {
  const containerRef = useContainerRef();
  const meta = useDataTableHandle('tableMeta');
  const style = useDataTableStore((state) => state.style);
  return (
    <div
      className="bg-background flex w-full flex-col"
      data-name={meta[TABLE_NAME_METADATA_KEY]}
      data-testid="data-table"
    >
      <DataTableControls togglesComponent={togglesComponent} onSearchChange={onSearchChange} />
      <div className="relative w-full overflow-auto rounded-md border" ref={containerRef}>
        <div className="flex min-w-full flex-col text-sm tracking-tight" style={style}>
          <DataTableHead />
          <DataTableBody emptyStateProps={emptyStateProps} />
        </div>
      </div>
      <DataTablePagination />
    </div>
  );
};
