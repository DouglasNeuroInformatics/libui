import { forwardRef } from 'react';

import { Title } from '@radix-ui/react-dialog';

import { cn } from '@/utils';

export const DialogTitle = forwardRef<React.ElementRef<typeof Title>, React.ComponentPropsWithoutRef<typeof Title>>(
  function DialogTitle({ className, ...props }, ref) {
    return (
      <Title className={cn('text-lg font-semibold leading-none tracking-tight', className)} ref={ref} {...props} />
    );
  }
);
