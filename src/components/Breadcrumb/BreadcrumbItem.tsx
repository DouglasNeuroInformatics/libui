import React from 'react';

import { cn } from '../../utils.js';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return <li className={cn('inline-flex items-center gap-1.5', className)} ref={ref} {...props} />;
  }
);
