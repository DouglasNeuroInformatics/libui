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
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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
