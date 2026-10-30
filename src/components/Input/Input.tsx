import * as React from 'react';

import { cn } from '#utils';

export type InputProps = React.ComponentProps<'input'>;

export const Input = ({ className, ref, type, ...props }: InputProps) => {
  return (
    <input
      autoComplete="off"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-80 focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      data-testid="input"
      ref={ref}
      type={type}
      {...props}
    />
  );
};
