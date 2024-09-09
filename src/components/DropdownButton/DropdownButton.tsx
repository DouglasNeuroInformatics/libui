import { forwardRef } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/utils';

export const DropdownButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function DropdownButton({ children, className, ...props }, ref) {
    return (
      <button
        className={cn(
          'flex h-9 w-full items-center gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
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
