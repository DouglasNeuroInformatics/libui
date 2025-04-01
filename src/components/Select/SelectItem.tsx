import { forwardRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/utils';

export const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ children, className, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-xs py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
