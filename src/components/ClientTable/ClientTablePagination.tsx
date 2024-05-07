import React from 'react';

import { useTranslation } from 'react-i18next';

export type ClientPagePaginationProps = {
  currentPage: number;
  firstEntry: number;
  lastEntry: number;
  pageCount: number;
  setCurrentPage: (value: number) => void;
  totalEntries: number;
};

export const ClientTablePagination = ({
  currentPage,
  firstEntry,
  lastEntry,
  pageCount,
  setCurrentPage,
  totalEntries
}: ClientPagePaginationProps) => {
  const { t } = useTranslation('libui');
  return (
    <div className="flex items-center justify-between px-1 py-3">
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-muted-foreground">
          {t('pagination.info', {
            first: firstEntry,
            last: lastEntry,
            total: totalEntries
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
  );
};
