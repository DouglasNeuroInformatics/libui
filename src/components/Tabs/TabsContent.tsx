import { forwardRef } from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '#utils';

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
