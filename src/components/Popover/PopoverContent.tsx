import * as React from 'react';

import { Content, Portal } from '@radix-ui/react-popover';

import { cn } from '#utils';

export type PopoverContentProps = {
  /** The preferred alignment against the anchor, which may change when collisions occur */
  align?: 'center' | 'end' | 'start';
  /** Change the default rendered element for the one passed as a child, merging their props and behavior */
  asChild?: boolean;
  /** Whether the content should be automatically focused when opened (default = true) */
  autofocus?: boolean;
  /** The content to display when the user opens the popover */
  children: React.ReactNode;
  /** Additional CSS classes to add to the component, potentially overriding default styling */
  className?: string;
  /** The distance in pixels from the viewport edges where collision detection should occur */
  collisionPadding?: number;
  /** The distance in pixels from the anchor */
  sideOffset?: number;
};

export const PopoverContent = React.forwardRef<React.ElementRef<typeof Content>, PopoverContentProps>(
  function PopoverContent(
    { align = 'center', asChild, autofocus = true, className, collisionPadding = 0, sideOffset = 4, ...props },
    ref
  ) {
    return (
      <Portal>
        <Content
          align={align}
          asChild={asChild}
          className={cn(
            'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border px-3 py-1.5 shadow-md outline-hidden',
            className
          )}
          collisionPadding={collisionPadding}
          ref={ref}
          sideOffset={sideOffset}
          onOpenAutoFocus={autofocus === false ? (event) => event.preventDefault() : undefined}
          {...props}
        />
      </Portal>
    );
  }
);
