import React from 'react';

import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/utils';

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(function CommandList({ className, ...props }, ref) {
  return (
    <CommandPrimitive.List
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
      ref={ref}
      {...props}
    />
  );
});
