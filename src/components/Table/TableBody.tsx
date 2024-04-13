import React from 'react';

import { cn } from '../../utils.js';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody className={cn('[&_tr:last-child]:border-0', className)} ref={ref} {...props} />;
  }
);
