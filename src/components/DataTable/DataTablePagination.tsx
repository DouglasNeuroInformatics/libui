import { range } from 'lodash-es';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';

import { Button } from '../Button/Button.tsx';
import { useDataTableHandle, useDataTableStore } from './hooks.ts';

export const DataTablePagination = () => {
  const { pageCount, pageIndex } = useDataTableHandle('paginationInfo');
  const setPageIndex = useDataTableStore((store) => store.setPageIndex);

  const start = Math.max(0, Math.min(pageIndex - 1, pageCount - 3));
  const end = Math.max(Math.min(start + 3, pageCount), 1);

  const pageIndexOptions = range(start, end);
  const lastPageIndex = pageCount - 1;

  return (
    <div className="mx-auto flex w-min gap-0.5 py-4 [&>button]:h-9">
      <Button disabled={pageIndex === 0} size="icon" type="button" variant="ghost" onClick={() => setPageIndex(0)}>
        <ChevronsLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        disabled={pageIndex === 0}
        size="icon"
        type="button"
        variant="ghost"
        onClick={() => setPageIndex(pageIndex - 1)}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      {pageIndexOptions.map((index) => (
        <Button
          key={index}
          size="icon"
          type="button"
          variant={index === pageIndex ? 'outline' : 'ghost'}
          onClick={() => setPageIndex(index)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        disabled={pageIndex === lastPageIndex}
        size="icon"
        type="button"
        variant="ghost"
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <Button
        disabled={pageIndex === lastPageIndex}
        size="icon"
        type="button"
        variant="ghost"
        onClick={() => setPageIndex(lastPageIndex)}
      >
        <ChevronsRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
