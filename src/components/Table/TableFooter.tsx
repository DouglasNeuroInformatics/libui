import { forwardRef } from 'react';

import { cn } from '#utils';

export const TableFooter = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot
        className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
