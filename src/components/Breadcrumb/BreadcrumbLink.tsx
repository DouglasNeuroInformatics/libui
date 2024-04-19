import React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '../../utils.js';

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  {
    asChild?: boolean;
  } & React.ComponentPropsWithoutRef<'a'>
>(function BreadcrumbLink({ asChild, className, ...props }, ref) {
  const Comp = asChild ? Slot : 'a';
  return <Comp className={cn('transition-colors hover:text-foreground', className)} ref={ref} {...props} />;
});
