import { forwardRef } from 'react';

export const BreadcrumbRoot = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  }
>(function BreadcrumbRoot({ ...props }, ref) {
  return <nav aria-label="breadcrumb" ref={ref} {...props} />;
});
