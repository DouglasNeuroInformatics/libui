import { MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/utils';

export const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    role="presentation"
    {...props}
  >
    <MoreHorizontalIcon className="h-4 w-4" />
  </span>
);
