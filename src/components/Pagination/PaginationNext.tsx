import * as React from 'react';

import { ChevronRightIcon } from 'lucide-react';

import { useTranslation } from '@/hooks';
import { cn } from '@/utils';

import { PaginationLink } from './PaginationLink';

export const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  const { t } = useTranslation('libui');
  return (
    <PaginationLink aria-label="Go to next page" className={cn('gap-1 pr-2.5', className)} size="md" {...props}>
      <span>{t('pagination.next')}</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
};
