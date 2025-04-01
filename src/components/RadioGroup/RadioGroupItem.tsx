import { forwardRef } from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';

import { cn } from '@/utils';

export const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-primary text-primary focus-visible:ring-ring flex aspect-square h-4 w-4 items-center justify-center rounded-full border shadow-sm focus:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
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
