import React from 'react';

import { cn } from '@/utils';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, ...props }, ref) {
    return <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} ref={ref} {...props} />;
  }
);
