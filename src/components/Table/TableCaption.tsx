import { cn } from '#utils';

export const TableCaption = ({ className, ref, ...props }: React.ComponentProps<'caption'>) => {
  return <caption className={cn('text-muted-foreground mt-4 text-sm', className)} ref={ref} {...props} />;
};
