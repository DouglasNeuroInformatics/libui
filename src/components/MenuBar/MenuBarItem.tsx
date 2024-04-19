import React from 'react';

import { Item } from '@radix-ui/react-menubar';

import { cn } from '../../utils.js';

export const MenuBarItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  {
    inset?: boolean;
  } & React.ComponentPropsWithoutRef<typeof Item>
>(function MenuBarItem({ className, inset, ...props }, ref) {
  return (
    <Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
