import * as React from 'react';

import { cn } from '@/utils';

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      autoComplete="off"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs placeholder:opacity-80 focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      data-testid="text-area"
      ref={ref}
      {...props}
    />
  );
});
