import React from 'react';

import { cn } from '@/utils';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption className={cn('mt-4 text-sm text-muted-foreground', className)} ref={ref} {...props} />;
  }
);
