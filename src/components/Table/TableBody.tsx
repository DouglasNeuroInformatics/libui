import { cn } from '#utils';

export const TableBody = ({ className, ref, ...props }: React.ComponentProps<'tbody'>) => {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} ref={ref} {...props} />;
};
