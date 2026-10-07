import { cn } from '#utils';

export const TableFooter = ({ className, ref, ...props }: React.ComponentProps<'tfoot'>) => {
  return (
    <tfoot className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)} ref={ref} {...props} />
  );
};
