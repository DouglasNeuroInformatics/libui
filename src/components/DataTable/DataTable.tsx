import { Fragment, useEffect, useMemo, useState } from 'react';

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
  headerAction?: {
    label: string;
    onClick: () => void;
  };
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
  headerAction,
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
    <Fragment>
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
          {headerAction && (
            <Button type="button" variant="outline" onClick={headerAction.onClick}>
              {headerAction.label}
            </Button>
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
      <div className="mx-auto flex w-min pt-6 pb-4">
        <Button
          className="flex gap-1"
          disabled={!table.getCanPreviousPage()}
          type="button"
          variant="ghost"
          onClick={() => table.firstPage()}
        >
          <ChevronsLeftIcon className="-ml-1 h-4 w-4" />
          <span>{t('pagination.first')}</span>
        </Button>
        <Button
          className="mr-1 flex gap-1"
          disabled={!table.getCanPreviousPage()}
          type="button"
          variant="ghost"
          onClick={() => table.previousPage()}
        >
          <ChevronLeftIcon className="-ml-1 h-4 w-4" />
          <span>{t('pagination.previous')}</span>
        </Button>
        {pageIndexOptions.map((index) => (
          <Button
            key={index}
            type="button"
            variant={index === pagination.pageIndex ? 'outline' : 'ghost'}
            onClick={() => table.setPageIndex(index)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className="ml-1 flex gap-1"
          disabled={!table.getCanNextPage()}
          type="button"
          variant="ghost"
          onClick={() => table.nextPage()}
        >
          <span>{t('pagination.next')}</span>
          <ChevronRightIcon className="-mr-1 h-4 w-4" />
        </Button>
        <Button
          className="flex gap-1"
          disabled={!table.getCanNextPage()}
          type="button"
          variant="ghost"
          onClick={() => table.lastPage()}
        >
          <span>{t('pagination.last')}</span>
          <ChevronsRightIcon className="-mr-1 h-4 w-4" />
        </Button>
      </div>
    </Fragment>
  );
};

export type { DataTableColumn };
