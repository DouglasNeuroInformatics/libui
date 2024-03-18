import React from 'react';

import { Content, Portal } from '@radix-ui/react-menubar';

import { cn } from '@/utils';
export const MenuBarContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(function MenuBarContent({ align = 'start', alignOffset = -4, className, sideOffset = 8, ...props }, ref) {
  return (
    <Portal>
      <Content
        align={align}
        alignOffset={alignOffset}
        className={cn(
          'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  );
});
