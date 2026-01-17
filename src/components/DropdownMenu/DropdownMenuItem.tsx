import { forwardRef } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '#utils';

export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(function DropdownMenuItem({ className, inset, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
