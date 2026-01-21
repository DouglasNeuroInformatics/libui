import { forwardRef } from 'react';

import { cn } from '#utils';

export const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption className={cn('text-muted-foreground mt-4 text-sm', className)} ref={ref} {...props} />;
  }
);
