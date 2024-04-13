import React from 'react';

import { cn } from '../../utils.js';

export const PaginationRoot = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    role="navigation"
    {...props}
  />
);
