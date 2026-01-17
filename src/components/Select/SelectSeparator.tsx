import { forwardRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '#utils';

export const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return <SelectPrimitive.Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} ref={ref} {...props} />;
});
