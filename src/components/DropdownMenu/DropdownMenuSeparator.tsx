import { forwardRef } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '#utils';

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <DropdownMenuPrimitive.Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} ref={ref} {...props} />;
});
