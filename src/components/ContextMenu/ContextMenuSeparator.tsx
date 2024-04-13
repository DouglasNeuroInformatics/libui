import React from 'react';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

import { cn } from '../../utils.js';

export const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return <ContextMenuPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-border', className)} ref={ref} {...props} />;
});
