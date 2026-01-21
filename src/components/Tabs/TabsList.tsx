import { forwardRef } from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '#utils';

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
