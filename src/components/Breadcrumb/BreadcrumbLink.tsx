import { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils';

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  }
>(function BreadcrumbLink({ asChild, className, ...props }, ref) {
  const Comp = asChild ? Slot : 'a';
  return <Comp className={cn('transition-colors hover:text-foreground', className)} ref={ref} {...props} />;
});
