import React from 'react';

import { Title } from '@radix-ui/react-dialog';

import { cn } from '../../utils.js';

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(function SheetTitle({ className, ...props }, ref) {
  return <Title className={cn('text-lg font-semibold text-foreground', className)} ref={ref} {...props} />;
});
