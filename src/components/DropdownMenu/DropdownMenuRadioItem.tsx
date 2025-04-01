import { forwardRef } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CircleIcon } from 'lucide-react';

import { cn } from '@/utils';

export const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ children, className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="h-4 w-4 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});
