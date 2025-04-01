import { forwardRef } from 'react';

import { Trigger } from '@radix-ui/react-menubar';

import { cn } from '@/utils';
export const MenuBarTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(function MenuBarTrigger({ className, ...props }, ref) {
  return (
    <Trigger
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-xs px-3 py-1 text-sm font-medium outline-hidden select-none',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
