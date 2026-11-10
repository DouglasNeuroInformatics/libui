import type { ComponentProps } from 'react';

import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';

import { cn } from '#utils';

/**
 * A slider for a number in a range. Set the `data-unset` attribute to dim the thumb, which indicates that
 * the position of the thumb is not a value selected by the user.
 */
export const Slider = ({ className, disabled, ref, ...props }: ComponentProps<typeof Root>) => {
  return (
    <Root
      className={cn('group/slider relative flex w-full touch-none items-center py-1.5 select-none', className)}
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
        className="bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border border-slate-500 shadow-sm transition-colors group-data-unset/slider:opacity-40 focus-visible:ring-1 focus-visible:outline-hidden aria-disabled:cursor-not-allowed"
        data-testid="slider-thumb"
      />
    </Root>
  );
};
