import React from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '../../utils.js';

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <AccordionPrimitive.Item className={cn('border-b', className)} ref={ref} {...props} />;
});
