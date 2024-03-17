import React from 'react';

import { Description } from '@radix-ui/react-dialog';

import { cn } from '@/utils';

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(function DialogDescription({ className, ...props }, ref) {
  return <Description className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />;
});
