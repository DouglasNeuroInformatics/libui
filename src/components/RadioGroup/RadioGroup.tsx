import React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '../../utils.js';
import { RadioGroupItem } from './RadioGroupItem.js';

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} data-testid="radio-group" {...props} ref={ref} />
  );
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem
});

export type { RadioGroupProps };
