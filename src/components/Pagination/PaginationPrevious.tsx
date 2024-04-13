import { ChevronLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '../../utils.js';
import { PaginationLink, type PaginationLinkProps } from './PaginationLink.js';

export const PaginationPrevious = ({ className, ...props }: PaginationLinkProps) => {
  const { t } = useTranslation('libui');
  return (
    <PaginationLink aria-label="Go to previous page" className={cn('gap-1 pl-2.5', className)} size="md" {...props}>
      <ChevronLeftIcon className="h-4 w-4" />
      <span>{t('pagination.previous')}</span>
    </PaginationLink>
  );
};
