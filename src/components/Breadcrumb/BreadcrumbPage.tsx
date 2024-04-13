import React from 'react';

import { cn } from '../../utils.js';

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  function BreadcrumbPage({ className, ...props }, ref) {
    return (
      <span
        aria-current="page"
        aria-disabled="true"
        className={cn('font-normal text-foreground', className)}
        ref={ref}
        role="link"
        {...props}
      />
    );
  }
);
