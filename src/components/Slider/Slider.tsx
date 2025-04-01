import { forwardRef } from 'react';

import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';

import { cn } from '@/utils';

export const Slider = forwardRef<React.ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  function Slider({ className, disabled, ...props }, ref) {
    return (
      <Root
        className={cn('relative flex w-full touch-none items-center py-1.5 select-none', className)}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <Track
          aria-disabled={disabled}
          className="bg-primary relative h-1.5 w-full grow overflow-hidden rounded-full opacity-15 aria-disabled:cursor-not-allowed aria-disabled:opacity-10"
          data-testid="slider-track"
        >
          <Range className="bg-primary absolute h-full" />
        </Track>
        <Thumb
          aria-disabled={disabled}
          className="bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border border-slate-500 shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none aria-disabled:cursor-not-allowed"
          data-testid="slider-thumb"
        />
      </Root>
    );
  }
);
