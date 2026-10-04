import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '#utils';

export const SelectLabel = ({ className, ref, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) => {
  return <SelectPrimitive.Label className={cn('px-2 py-1.5 text-sm font-semibold', className)} ref={ref} {...props} />;
};
