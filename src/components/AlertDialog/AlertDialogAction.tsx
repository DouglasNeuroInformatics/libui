import { forwardRef } from 'react';

import { Action } from '@radix-ui/react-alert-dialog';

import { cn } from '@/utils';

import { buttonVariants } from '../Button';

export const AlertDialogAction = forwardRef<
  React.ElementRef<typeof Action>,
  React.ComponentPropsWithoutRef<typeof Action>
>(function AlertDialogAction({ className, ...props }, ref) {
  return <Action className={cn(buttonVariants(), className)} ref={ref} {...props} />;
});
