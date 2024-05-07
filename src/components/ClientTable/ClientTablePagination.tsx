import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button.js';

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
    <div className="flex items-center justify-between py-3">
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-muted-foreground">
          {t('pagination.info', {
            first: firstEntry,
            last: lastEntry,
            total: totalEntries
          })}
        </p>
      </div>
      <div className="flex flex-1 justify-between gap-3 sm:justify-end">
        <Button
          disabled={currentPage === 1}
          type="button"
          variant="outline"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          {t('pagination.previous')}
        </Button>
        <Button
          disabled={currentPage === pageCount}
          type="button"
          variant="outline"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          {t('pagination.next')}
        </Button>
      </div>
    </div>
  );
};
