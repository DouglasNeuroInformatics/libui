import type { ComponentProps } from 'react';

import { cn } from '#utils';

export const TableHead = ({ className, ref, ...props }: ComponentProps<'th'>) => {
  return (
    <th
      className={cn(
        'text-muted-foreground px-6 py-3 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};
