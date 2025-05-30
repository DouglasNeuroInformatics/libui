import { useEffect, useMemo, useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { range } from 'lodash-es';
import { ArrowUpDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import type { Promisable } from 'type-fest';

import { useTranslation } from '@/hooks';

import { Button } from '../Button';
import { SearchBar } from '../SearchBar';
import { Table } from '../Table';
import { DestructiveActionDialog } from './DestructiveActionDialog';
import { RowActionsDropdown } from './RowActionsDropdown';

import type { RowAction } from './RowActionsDropdown';

type StaticDataTableColumn<TData extends { [key: string]: unknown }> = {
  [K in Extract<keyof TData, string>]: {
    format?: 'email' | ((val: TData[K]) => unknown);
    key: K;
    label: string;
    sortable?: boolean;
  };
}[Extract<keyof TData, string>];

type DynamicDataTableColumn<TData extends { [key: string]: unknown }> = {
  compute: (row: TData) => unknown;
  key?: never;
  label: string;
};

type DataTableColumn<TData extends { [key: string]: unknown }> =
  | DynamicDataTableColumn<TData>
  | StaticDataTableColumn<TData>;

type DataTableProps<TData extends { [key: string]: unknown }> = {
  columns: DataTableColumn<TData>[];
  data: TData[];
  headerActions?: {
    label: string;
    onClick: () => void;
  }[];
  rowActions?: RowAction<TData>[];
  search?: {
    key: Extract<keyof TData, string>;
    placeholder?: string;
  };
};

function isStaticColumn<TData extends { [key: string]: unknown }>(
  column: DataTableColumn<TData>
): column is StaticDataTableColumn<TData> {
  return typeof column.key === 'string';
}

export const DataTable = <TData extends { [key: string]: unknown }>({
  columns,
  data,
  headerActions,
  rowActions,
  search
}: DataTableProps<TData>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState('');
  const [destructiveActionPending, setDestructiveActionPending] = useState<(() => Promisable<void>) | null>(null);
  const { t } = useTranslation('libui');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const columnDefs = useMemo<ColumnDef<TData, unknown>[]>(() => {
    const result: ColumnDef<TData, unknown>[] = columns.map((col) => {
      let def: ColumnDef<TData, unknown>;
      if (isStaticColumn(col)) {
        def = {
          accessorKey: col.key,
          header: col.sortable
            ? ({ column }) => (
                <button
                  className="flex items-center justify-between gap-2"
                  onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                  {col.label}
                  <ArrowUpDownIcon className="h-4 w-4" />
                </button>
              )
            : col.label
        };
        if (col.format) {
          def.cell = ({ getValue }) => {
            const value = getValue() as TData[Extract<keyof TData, string>];
            if (typeof col.format === 'function') {
              return col.format(value);
            } else if (col.format === 'email') {
              return (
                <a className="hover:underline" href={`mailto:${value as string}`}>
                  {value as string}
                </a>
              );
            }
            return value;
          };
        }
      } else {
        def = {
          accessorFn: col.compute,
          header: col.label
        };
      }
      return def;
    });

    if (rowActions) {
      result.push({
        cell: ({ row }) => {
          return (
            <RowActionsDropdown
              row={row}
              rowActions={rowActions}
              setDestructiveActionPending={setDestructiveActionPending}
            />
          );
        },
        id: '__actions'
      });
    }
    return result;
  }, [columns]);

  const table = useReactTable({
    columns: columnDefs,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      pagination,
      sorting
    }
  });

  useEffect(() => {
    if (search) {
      table.getColumn(search.key)?.setFilterValue(searchValue);
    }
  }, [table, searchValue]);

  const headerGroups = table.getHeaderGroups();
  const { rows } = table.getRowModel();

  const pageCount = table.getPageCount();
  const currentPage = pagination.pageIndex;

  const start = Math.max(0, Math.min(currentPage - 1, pageCount - 3));
  const end = Math.min(start + 3, pageCount);

  const pageIndexOptions = range(start, end);

  return (
    <div className="flex flex-col">
      <DestructiveActionDialog
        destructiveActionPending={destructiveActionPending}
        setDestructiveActionPending={setDestructiveActionPending}
      />
      {search && (
        <div className="flex items-center gap-4 py-4">
          <SearchBar
            className="grow"
            placeholder={search.placeholder}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          {headerActions && (
            <div className="flex gap-2">
              {headerActions.map(({ label, onClick }, i) => (
                <Button key={i} type="button" variant="outline" onClick={onClick}>
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <Table.Header>
            {headerGroups.map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Head key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Head>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {rows?.length ? (
              rows.map((row) => (
                <Table.Row data-state={row.getIsSelected() && 'selected'} key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell className="h-24 text-center" colSpan={rowActions ? columns.length + 1 : columns.length}>
                  {t({
                    en: 'No Results',
                    fr: 'Aucun résultat'
                  })}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex w-min gap-0.5 py-4 [&>button]:h-9">
        <Button
          disabled={!table.getCanPreviousPage()}
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => table.firstPage()}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          disabled={!table.getCanPreviousPage()}
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => table.previousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        {pageIndexOptions.map((index) => (
          <Button
            key={index}
            size="icon"
            type="button"
            variant={index === pagination.pageIndex ? 'outline' : 'ghost'}
            onClick={() => table.setPageIndex(index)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          disabled={!table.getCanNextPage()}
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => table.nextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => table.lastPage()}
        >
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export type { DataTableColumn };
