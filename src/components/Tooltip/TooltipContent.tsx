import React from 'react';

import { Content } from '@radix-ui/react-tooltip';

import { cn } from '../../utils.js';

export type TooltipContentProps = {
  /** The preferred alignment against the trigger, which may change when collisions occur. */
  align?: 'center' | 'end' | 'start';
  /** The content to display when the user hovers over the tooltip trigger */
  children: React.ReactNode;
  /** Additional CSS classes to add to the component, potentially overriding default styling */
  className?: string;
  /** The distance in pixels from the viewport edges where collision detection should occur */
  collisionPadding?: number;
  /** The distance in pixels from the trigger */
  sideOffset?: number;
};

export const TooltipContent = React.forwardRef<React.ElementRef<typeof Content>, TooltipContentProps>(
  function TooltipContent({ className, collisionPadding = 0, sideOffset = 4, ...props }, ref) {
    return (
      <Content
        className={cn(
          'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        collisionPadding={collisionPadding}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    );
  }
);
