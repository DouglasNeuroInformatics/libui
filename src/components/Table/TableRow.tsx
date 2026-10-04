import { cn } from '#utils';

export const TableRow = ({ className, ref, ...props }: React.ComponentProps<'tr'>) => {
  return (
    <tr
      className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className)}
      ref={ref}
      {...props}
    />
  );
};
