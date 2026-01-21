import * as React from 'react';

import { cn } from '#utils';

export const SheetBody = ({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className={cn('py-4', className)} {...props}>
      {children}
    </div>
  );
};
