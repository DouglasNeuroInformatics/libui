import React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';

import { cn } from '../../utils.js';

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <RadioGroupPrimitive.Indicator asChild>
        <CircleIcon
          className="fill-current text-current"
          style={{ height: '0.625rem', strokeWidth: '2px', width: '0.625rem' }}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
