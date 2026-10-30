import type { ComponentProps } from 'react';

import { cn } from '#utils';

export const TableHeader = ({ className, ref, ...props }: ComponentProps<'thead'>) => {
  return <thead className={cn('[&_tr]:border-b', className)} ref={ref} {...props} />;
};
