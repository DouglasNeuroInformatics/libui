import React from 'react';

export const BreadcrumbRoot = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  }
>(function BreadcrumbRoot({ ...props }, ref) {
  return <nav aria-label="breadcrumb" ref={ref} {...props} />;
});
