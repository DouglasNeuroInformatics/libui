import { cn } from '#utils';

export const TableRoot = ({ className, ref, ...props }: React.ComponentProps<'table'>) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} ref={ref} {...props} />
    </div>
  );
};
