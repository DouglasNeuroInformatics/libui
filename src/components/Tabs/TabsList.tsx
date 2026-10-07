import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '#utils';

export const TabsList = ({ className, ref, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => {
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
};
