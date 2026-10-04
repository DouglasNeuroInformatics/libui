import { cn } from '#utils';

export const TableHeader = ({ className, ref, ...props }: React.ComponentProps<'thead'>) => {
  return <thead className={cn('[&_tr]:border-b', className)} ref={ref} {...props} />;
};
