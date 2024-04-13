import React from 'react';

import { Overlay } from '@radix-ui/react-dialog';

import { cn } from '../../utils.js';

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
