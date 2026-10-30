import type { ComponentProps } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '#utils';

export const SelectSeparator = ({ className, ref, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) => {
  return <SelectPrimitive.Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} ref={ref} {...props} />;
};
