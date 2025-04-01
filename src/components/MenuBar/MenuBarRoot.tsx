import { forwardRef } from 'react';

import { Root } from '@radix-ui/react-menubar';

import { cn } from '@/utils';

export const MenuBarRoot = forwardRef<React.ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  function MenuBarRoot({ className, ...props }, ref) {
    return (
      <Root
        className={cn('bg-background flex h-9 items-center space-x-1 rounded-md border p-1 shadow-xs', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
