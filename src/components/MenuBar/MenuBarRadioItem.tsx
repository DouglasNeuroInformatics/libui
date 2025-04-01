import { forwardRef } from 'react';

import { ItemIndicator, RadioItem } from '@radix-ui/react-menubar';
import { CircleIcon } from 'lucide-react';

import { cn } from '@/utils';

export const MenuBarRadioItem = forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem>
>(function MenuBarRadioItem({ children, className, ...props }, ref) {
  return (
    <RadioItem
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <CircleIcon className="fill-current" style={{ height: 8, width: 8 }} />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  );
});
