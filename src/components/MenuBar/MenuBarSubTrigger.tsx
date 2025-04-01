import { forwardRef } from 'react';

import { SubTrigger } from '@radix-ui/react-menubar';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/utils';

export const MenuBarSubTrigger = forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(function MenuBarSubTrigger({ children, className, inset, ...props }, ref) {
  return (
    <SubTrigger
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden select-none',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </SubTrigger>
  );
});
