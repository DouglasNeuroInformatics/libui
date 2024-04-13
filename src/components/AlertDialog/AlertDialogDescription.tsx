import React from 'react';

import { Description } from '@radix-ui/react-alert-dialog';

import { cn } from '../../utils.js';

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(function AlertDialogDescription({ className, ...props }, ref) {
  return <Description className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />;
});
