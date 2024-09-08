import * as React from 'react';

export const PaginationItem = ({ className, ...props }: React.ComponentProps<'li'>) => (
  <li className={className} {...props} />
);
