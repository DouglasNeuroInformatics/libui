import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { LegacyTable, type LegacyTableEntry, type LegacyTableProps } from './LegacyTable';

/** @deprecated */
export const LegacyClientTable = <T extends LegacyTableEntry>({ data, ...props }: LegacyTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const { t } = useTranslation('libui');

  const pageCount = Math.ceil(data.length / entriesPerPage);

  const firstEntry = data.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
  const lastEntry = Math.min(firstEntry + entriesPerPage - 1, data.length);
  const currentEntries = data.slice(firstEntry - 1, lastEntry);

  return (
    <div>
      <LegacyTable data={currentEntries} {...props} />
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
