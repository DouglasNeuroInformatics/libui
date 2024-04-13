import { range, toBasicISOString } from '@douglasneuroinformatics/libjs';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type LegacyColumnDropdownOptions, LegacyTableColumnHeader } from './LegacyTableColumnHeader.js';

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

/** @deprecated */
export type LegacyTableEntry = { [key: string]: unknown };

/** @deprecated */
export type LegacyFieldFactory<T extends LegacyTableEntry = LegacyTableEntry> = (entry: T) => string;

/** @deprecated */
export type LegacyTableColumn<T extends LegacyTableEntry> = {
  /** How to determine the values for column */
  field: LegacyFieldFactory<T> | keyof T;

  /** Override the default formatter for this field */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (value: any) => string;

  /** The label to be displayed on the header */
  label: string;
};

/** @deprecated */
export type LegacyTableProps<T extends LegacyTableEntry> = {
  className?: string;
  columnDropdownOptions?: LegacyColumnDropdownOptions<T>;
  columns: LegacyTableColumn<T>[];
  data: T[];
  minRows?: number;
  onEntryClick?: (entry: T) => void;
};

/** @deprecated */
export const LegacyTable = <T extends LegacyTableEntry>({
  className,
  columnDropdownOptions,
  columns,
  data,
  minRows,
  onEntryClick
}: LegacyTableProps<T>) => {
  const nRows = Math.max(data.length, minRows ?? -1);
  return (
    <div className={twMerge('min-w-full overflow-hidden rounded-md bg-slate-50 shadow dark:bg-slate-800', className)}>
      <div className="w-full overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="border-b border-slate-300 bg-slate-50 dark:border-0 dark:bg-slate-700">
            <tr>
              {columns.map((column, i) => (
                <th
                  className="whitespace-nowrap text-left  text-sm font-semibold text-slate-800 dark:text-slate-200"
                  key={i}
                >
                  <LegacyTableColumnHeader column={column} dropdownOptions={columnDropdownOptions} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-600">
            {nRows > 0 &&
              range(nRows).map((i) => {
                const entry = data[i];
                return (
                  <tr
                    className={clsx('whitespace-nowrap p-4 text-sm text-muted-foreground', {
                      'cursor-pointer hover:backdrop-brightness-95': entry && typeof onEntryClick === 'function'
                    })}
                    data-cy="table-row"
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
                        <td className="whitespace-nowrap px-6" data-cy="table-data-item" key={j} style={{ height: 42 }}>
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
  );
};
