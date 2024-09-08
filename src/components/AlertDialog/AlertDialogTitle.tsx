import { forwardRef } from 'react';

import { Title } from '@radix-ui/react-alert-dialog';

import { cn } from '@/utils';

export const AlertDialogTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(function AlertDialogTitle({ className, ...props }, ref) {
  return <Title className={cn('text-lg font-semibold', className)} ref={ref} {...props} />;
});
