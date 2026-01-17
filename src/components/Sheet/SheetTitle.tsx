import { forwardRef } from 'react';

import { Title } from '@radix-ui/react-dialog';

import { cn } from '#utils';

export const SheetTitle = forwardRef<React.ElementRef<typeof Title>, React.ComponentPropsWithoutRef<typeof Title>>(
  function SheetTitle({ className, ...props }, ref) {
    return <Title className={cn('text-foreground text-lg font-semibold', className)} ref={ref} {...props} />;
  }
);
