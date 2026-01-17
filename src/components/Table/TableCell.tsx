import { forwardRef } from 'react';

import { cn } from '#utils';

export const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, ...props }, ref) {
    return (
      <td className={cn('px-6 py-3 align-middle [&:has([role=checkbox])]:pr-0', className)} ref={ref} {...props} />
    );
  }
);
