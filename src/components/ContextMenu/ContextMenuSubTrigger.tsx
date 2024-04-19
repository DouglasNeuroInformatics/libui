import React from 'react';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '../../utils.js';

export const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  {
    inset?: boolean;
  } & React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>
>(function ContextMenuSubTrigger({ children, className, inset, ...props }, ref) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
});
