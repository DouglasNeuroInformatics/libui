import React from 'react';

import { Label } from '@radix-ui/react-menubar';

import { cn } from '../../utils.js';

export const MenuBarLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
  }
>(function MenuBarLabel({ className, inset, ...props }, ref) {
  return <Label className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} ref={ref} {...props} />;
});
