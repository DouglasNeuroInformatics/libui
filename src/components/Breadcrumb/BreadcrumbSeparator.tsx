import * as React from 'react';

import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/utils';

export const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} role="presentation" {...props}>
    {children ?? <ChevronRightIcon />}
  </li>
);
