import React from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '../../utils.js';

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(function SelectScrollDownButton({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      ref={ref}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
});
