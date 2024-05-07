import React, { useState } from 'react';

import { range, toBasicISOString } from '@douglasneuroinformatics/libjs';
import { useTranslation } from 'react-i18next';

import { cn } from '../../utils.js';
import { ClientTableColumnHeader } from './ClientTableColumnHeader.js';

/** Coerces the value in a cell to a string for consistant display purposes */
function defaultFormatter(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value.toFixed(2).toString();
  } else if (typeof value === 'undefined') {
    return 'NA';
  }
  if (value instanceof Date) {
    return toBasicISOString(value);
  }
  return JSON.stringify(value);
}

export type ClientTableEntry = { [key: string]: unknown };

export type ClientFieldFactory<T extends ClientTableEntry = ClientTableEntry> = (entry: T) => string;

export type ClientTableColumn<T extends ClientTableEntry> = {
  /** How to determine the values for column */
  field: ClientFieldFactory<T> | keyof T;

  /** Override the default formatter for this field */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (value: any) => string;

  /** The label to be displayed on the header */
  label: string;
};

export type ClientTableDropdownOptions<T extends ClientTableEntry> = {
  icon?: React.ComponentType<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
  label: string;
  onSelection: (column: ClientTableColumn<T>) => void;
}[];

export type ClientTableColumnProps<T extends ClientTableEntry> = {
  column: ClientTableColumn<T>;
  dropdownOptions?: ClientTableDropdownOptions<T>;
};

export type ClientTableProps<T extends ClientTableEntry> = {
  className?: string;
  columnDropdownOptions?: ClientTableDropdownOptions<T>;
  columns: ClientTableColumn<T>[];
  data: T[];
  minRows?: number;
  onEntryClick?: (entry: T) => void;
};

export const ClientTable = <T extends ClientTableEntry>({
  className,
  columnDropdownOptions,
  columns,
  data,
  minRows,
  onEntryClick
}: ClientTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const { t } = useTranslation('libui');

  const pageCount = Math.ceil(data.length / entriesPerPage);

  const firstEntry = data.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
  const lastEntry = Math.min(firstEntry + entriesPerPage - 1, data.length);
  const currentEntries = data.slice(firstEntry - 1, lastEntry);
  const nRows = Math.max(currentEntries.length, minRows ?? -1);

  return (
    <div>
      <div className={cn('min-w-full overflow-hidden rounded-md bg-slate-50 shadow dark:bg-slate-800', className)}>
        <div className="w-full overflow-x-scroll">
          <table className="w-full table-auto">
            <thead className="border-b border-slate-300 bg-slate-50 dark:border-0 dark:bg-slate-700">
              <tr>
                {columns.map((column, i) => (
                  <th
                    className="whitespace-nowrap text-left  text-sm font-semibold text-slate-800 dark:text-slate-200"
                    key={i}
                  >
                    <ClientTableColumnHeader column={column} dropdownOptions={columnDropdownOptions} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-600">
              {nRows > 0 &&
                range(nRows).map((i) => {
                  const entry = currentEntries[i];
                  return (
                    <tr
                      className={cn('whitespace-nowrap p-4 text-sm text-muted-foreground', {
                        'cursor-pointer hover:backdrop-brightness-95': entry && typeof onEntryClick === 'function'
                      })}
                      // eslint-disable-next-line react/no-unknown-property
                      currentEntries-cy="table-row"
                      key={i}
                      onClick={() => {
                        entry && onEntryClick && onEntryClick(entry);
                      }}
                    >
                      {columns.map(({ field, formatter }, j) => {
                        let value: unknown;
                        if (!entry) {
                          value = '';
                        } else if (typeof field === 'function') {
                          value = field(entry);
                        } else {
                          value = entry[field];
                        }
                        const formattedValue = entry && formatter ? formatter(value) : defaultFormatter(value);
                        return (
                          <td
                            className="whitespace-nowrap px-6"
                            // eslint-disable-next-line react/no-unknown-property
                            currentEntries-cy="table-currentEntries-item"
                            key={j}
                            style={{ height: 42 }}
                          >
                            <span className="block text-ellipsis leading-none">{formattedValue}</span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between px-1 py-3">
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-muted-foreground">
            {t('pagination.info', {
              first: firstEntry,
              last: lastEntry,
              total: data.length
            })}
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            className="relative inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-muted-foreground disabled:opacity-75 dark:border-slate-600 dark:bg-slate-800"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            {t('pagination.previous')}
          </button>
          <button
            className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-muted-foreground disabled:opacity-75 dark:border-slate-600 dark:bg-slate-800"
            disabled={currentPage === pageCount}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            {t('pagination.next')}
          </button>
        </div>
      </div>
    </div>
  );
};
