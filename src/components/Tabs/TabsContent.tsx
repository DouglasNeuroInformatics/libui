import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '#utils';

export const TabsContent = ({ className, ref, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) => {
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
};
