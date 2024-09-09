import { forwardRef } from 'react';

import { cn } from '@/utils';

export const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody className={cn('[&_tr:last-child]:border-0', className)} ref={ref} {...props} />;
  }
);
