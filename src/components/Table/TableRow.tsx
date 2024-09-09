import { forwardRef } from 'react';

import { cn } from '@/utils';

export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      className={cn('hover:bg-muted/50 border-b transition-colors data-[state=selected]:bg-muted', className)}
      ref={ref}
      {...props}
    />
  );
});
