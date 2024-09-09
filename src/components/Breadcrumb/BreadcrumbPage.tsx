import { forwardRef } from 'react';

import { cn } from '@/utils';

export const BreadcrumbPage = forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
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
