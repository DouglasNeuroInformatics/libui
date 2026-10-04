import { cn } from '#utils';

export const TableCell = ({ className, ref, ...props }: React.ComponentProps<'td'>) => {
  return <td className={cn('px-6 py-3 align-middle [&:has([role=checkbox])]:pr-0', className)} ref={ref} {...props} />;
};
