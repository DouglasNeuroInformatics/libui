import { useEffect, useRef } from 'react';

import { range } from 'lodash-es';

import { cn } from '#utils';

import { ScrollArea } from '../ScrollArea/ScrollArea.tsx';

export type YearSelectorProps = {
  onSelection: (date: Date) => void;
  selected: Date;
};

export const YearSelector = (props: YearSelectorProps) => {
  const selectedRef = useRef<HTMLButtonElement>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from(range(currentYear - 100, currentYear + 8)).reverse();

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  return (
    <ScrollArea className="h-56 w-56">
      <div className="text-muted-foreground grid grid-cols-3 gap-x-2 gap-y-1 text-sm">
        {years.map((year) => (
          <div className="flex h-7 items-center justify-center" key={year}>
            <button
              className={cn(
                'h-full w-full rounded-md hover:bg-slate-200 dark:hover:bg-slate-700',
                year === props.selected.getFullYear() &&
                  'bg-primary text-primary-foreground hover:bg-primary dark:hover:bg-primary'
              )}
              ref={year === props.selected.getFullYear() ? selectedRef : null}
              tabIndex={-1}
              type="button"
              onClick={() => {
                props.onSelection(new Date(year, 0));
              }}
            >
              {year}
            </button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
