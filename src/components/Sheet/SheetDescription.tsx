import { forwardRef } from 'react';

import { Description } from '@radix-ui/react-dialog';

import { cn } from '#utils';

export const SheetDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(function SheetDescription({ className, ...props }, ref) {
  return <Description className={cn('text-muted-foreground text-sm', className)} ref={ref} {...props} />;
});
