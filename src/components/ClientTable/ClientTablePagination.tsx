import { useTranslation } from '@/hooks';

import { Button } from '../Button';

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
        <p
          className="text-sm font-medium text-muted-foreground"
          data-testid="page-numbers"
        >{`${firstEntry} - ${lastEntry} / ${totalEntries}`}</p>
      </div>
      <div className="flex flex-1 justify-between gap-3 sm:justify-end">
        <Button
          data-testid="first-page-button"
          disabled={currentPage === 1}
          type="button"
          variant="outline"
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          {t('pagination.firstPage')}
        </Button>
        <Button
          data-testid="previous-page-button"
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
          data-testid="next-page-button"
          disabled={currentPage === pageCount}
          type="button"
          variant="outline"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          {t('pagination.next')}
        </Button>
        <Button
          data-testid="last-page-button"
          disabled={currentPage === pageCount}
          type="button"
          variant="outline"
          onClick={() => {
            setCurrentPage(pageCount);
          }}
        >
          {t('pagination.lastPage')}
        </Button>
      </div>
    </div>
  );
};
