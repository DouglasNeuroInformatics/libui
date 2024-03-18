import React from 'react';

import { cn } from '@/utils';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...props }, ref) {
    return <thead className={cn('[&_tr]:border-b', className)} ref={ref} {...props} />;
  }
);
