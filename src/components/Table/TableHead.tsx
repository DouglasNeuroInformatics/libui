import { forwardRef } from 'react';

import { cn } from '#utils';

export const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ className, ...props }, ref) {
    return (
      <th
        className={cn(
          'text-muted-foreground px-6 py-3 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
