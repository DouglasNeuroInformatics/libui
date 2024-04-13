import React from 'react';

import { Trigger } from '@radix-ui/react-menubar';

import { cn } from '../../utils.js';
export const MenuBarTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(function MenuBarTrigger({ className, ...props }, ref) {
  return (
    <Trigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
