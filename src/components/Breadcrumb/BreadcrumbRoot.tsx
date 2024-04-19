import React from 'react';

export const BreadcrumbRoot = React.forwardRef<
  HTMLElement,
  {
    separator?: React.ReactNode;
  } & React.ComponentPropsWithoutRef<'nav'>
>(function BreadcrumbRoot({ ...props }, ref) {
  return <nav aria-label="breadcrumb" ref={ref} {...props} />;
});
