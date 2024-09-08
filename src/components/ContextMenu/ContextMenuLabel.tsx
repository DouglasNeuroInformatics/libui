import { forwardRef } from 'react';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

import { cn } from '@/utils';

export const ContextMenuLabel = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  {
    inset?: boolean;
  } & React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>
>(function ContextMenuLabel({ className, inset, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold text-foreground', inset && 'pl-8', className)}
      ref={ref}
      {...props}
    />
  );
});
