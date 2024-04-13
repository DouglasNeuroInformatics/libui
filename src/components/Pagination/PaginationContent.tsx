import React from 'react';

import { cn } from '../../utils.js';

export const PaginationContent = ({ className, ...props }: React.ComponentProps<'ul'>) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} {...props} />
);
