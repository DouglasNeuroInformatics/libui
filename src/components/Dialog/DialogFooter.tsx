import React from 'react';

import { cn } from '../../utils.js';

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-x-2 gap-y-0.5 sm:flex-row', className)} {...props} />
);
