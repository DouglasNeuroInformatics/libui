import React from 'react';

import { Action } from '@radix-ui/react-alert-dialog';

import { cn } from '@/utils';

import { buttonVariants } from '../Button';

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Action>,
  React.ComponentPropsWithoutRef<typeof Action>
>(function AlertDialogAction({ className, ...props }, ref) {
  return <Action className={cn(buttonVariants(), className)} ref={ref} {...props} />;
});
