import React from 'react';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/utils';

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(function Separator({ className, decorative = true, orientation = 'horizontal', ...props }, ref) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      data-testid="separator"
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  );
});
