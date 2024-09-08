import { forwardRef } from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/utils';

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
