import { forwardRef } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/utils';

export const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(function DropdownMenuSubTrigger({ children, className, inset, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        'focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-none select-none',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
