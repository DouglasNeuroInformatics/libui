import { forwardRef } from 'react';

export const BreadcrumbRoot = forwardRef<
  HTMLElement,
  {
    separator?: React.ReactNode;
  } & React.ComponentPropsWithoutRef<'nav'>
>(function BreadcrumbRoot({ ...props }, ref) {
  return <nav aria-label="breadcrumb" ref={ref} {...props} />;
});
