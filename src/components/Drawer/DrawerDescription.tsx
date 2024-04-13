import React from 'react';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '../../utils.js';

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Description className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
  );
});
