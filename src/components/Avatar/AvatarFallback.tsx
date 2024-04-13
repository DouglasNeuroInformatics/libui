import React from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '../../utils.js';

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
      ref={ref}
      {...props}
    />
  );
});
