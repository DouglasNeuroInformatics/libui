import { forwardRef } from 'react';

import { Cancel } from '@radix-ui/react-alert-dialog';

import { cn } from '@/utils';

import { buttonVariants } from '../Button';

export const AlertDialogCancel = forwardRef<
  React.ElementRef<typeof Cancel>,
  React.ComponentPropsWithoutRef<typeof Cancel>
>(function AlertDialogCancel({ className, ...props }, ref) {
  return (
    <Cancel className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)} ref={ref} {...props} />
  );
});
