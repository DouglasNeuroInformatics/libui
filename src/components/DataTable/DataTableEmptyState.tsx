import type { LucideIcon } from 'lucide-react';

import { cn } from '@/utils';

export type DataTableEmptyStateProps = {
  className?: string;
  description?: string;
  icon?: LucideIcon;
  title: string;
};

export const DataTableEmptyState: React.FC<DataTableEmptyStateProps> = ({
  className,
  description,
  icon: Icon,
  title
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)} data-testid="data-table-empty-state">
      {Icon && <Icon className="text-muted-foreground mb-2" style={{ height: '20px', width: '20px' }} />}
      <h3 className="text-foreground text-sm font-semibold">{title}</h3>
      {description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
    </div>
  );
};
