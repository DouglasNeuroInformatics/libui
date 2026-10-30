import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '#utils';

export const DialogBody = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className={cn('py-4', className)} {...props}>
      {children}
    </div>
  );
};
