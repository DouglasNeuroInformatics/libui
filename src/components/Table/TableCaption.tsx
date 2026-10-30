import type { ComponentProps } from 'react';

import { cn } from '#utils';

export const TableCaption = ({ className, ref, ...props }: ComponentProps<'caption'>) => {
  return <caption className={cn('text-muted-foreground mt-4 text-sm', className)} ref={ref} {...props} />;
};
