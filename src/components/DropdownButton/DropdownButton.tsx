import { forwardRef } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/utils';

export const DropdownButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function DropdownButton({ children, className, ...props }, ref) {
    return (
      <button
        className={cn(
          'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs focus:ring-1 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          children ? 'justify-between' : 'justify-end',
          className
        )}
        ref={ref}
        type="button"
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
