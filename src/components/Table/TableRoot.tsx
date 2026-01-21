import { forwardRef } from 'react';

import { cn } from '#utils';

export const TableRoot = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(function TableRoot(
  { className, ...props },
  ref
) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} ref={ref} {...props} />
    </div>
  );
});
