import { forwardRef } from 'react';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { CircleIcon } from 'lucide-react';

import { cn } from '@/utils';

export const ContextMenuRadioItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(function ContextMenuRadioItem({ children, className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="fill-current" style={{ height: 8, width: 8 }} />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});
