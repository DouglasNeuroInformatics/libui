import React from 'react';

import { Corner, Root, Viewport } from '@radix-ui/react-scroll-area';

import { cn } from '@/utils';

import { ScrollBar } from './ScrollBar';

export const ScrollArea = React.forwardRef<React.ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  function ScrollArea({ children, className, ...props }, ref) {
    return (
      <Root className={cn('relative overflow-hidden', className)} data-testid="scroll-area" ref={ref} {...props}>
        <Viewport className="h-full w-full rounded-[inherit]">{children}</Viewport>
        <ScrollBar />
        <Corner />
      </Root>
    );
  }
);
