import { forwardRef } from 'react';

import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '../../utils.js';

export const CommandSeparator = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(function CommandSeparator({ className, ...props }, ref) {
  return <CommandPrimitive.Separator className={cn('-mx-1 h-px bg-border', className)} ref={ref} {...props} />;
});
