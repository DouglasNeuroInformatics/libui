import { forwardRef } from 'react';

import { cn } from '#utils';

export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className)}
      ref={ref}
      {...props}
    />
  );
});
