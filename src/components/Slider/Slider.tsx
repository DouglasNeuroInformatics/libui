import React from 'react';

import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';

import { cn } from '@/utils';

export const Slider = React.forwardRef<React.ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  function Slider({ className, ...props }, ref) {
    return (
      <Root
        className={cn('relative flex w-full touch-none select-none items-center py-1.5', className)}
        ref={ref}
        {...props}
      >
        <Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary opacity-15">
          <Range className="absolute h-full bg-primary" />
        </Track>
        <Thumb className="block h-4 w-4 rounded-full border border-slate-500 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </Root>
    );
  }
);
