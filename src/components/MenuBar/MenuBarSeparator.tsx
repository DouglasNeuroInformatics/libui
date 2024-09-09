import { forwardRef } from 'react';

import { Separator } from '@radix-ui/react-menubar';

import { cn } from '@/utils';

export const MenuBarSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(function MenuBarSeparator({ className, ...props }, ref) {
  return <Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} ref={ref} {...props} />;
});
