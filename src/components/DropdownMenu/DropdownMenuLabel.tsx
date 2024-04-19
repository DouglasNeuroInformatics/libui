import React from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '../../utils.js';

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  {
    inset?: boolean;
  } & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownMenuLabel({ className, inset, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
      ref={ref}
      {...props}
    />
  );
});
