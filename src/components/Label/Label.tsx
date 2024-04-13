import React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '../../utils.js';

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(function Label({ className, ...props }, ref) {
  return <LabelPrimitive.Root className={cn(labelVariants(), className)} ref={ref} {...props} />;
});
