import { forwardRef } from 'react';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

import { cn } from '@/utils';

export const ContextMenuItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(function ContextMenuItem({ className, inset, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
