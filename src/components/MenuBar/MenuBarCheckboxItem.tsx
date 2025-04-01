import { forwardRef } from 'react';

import { CheckboxItem, ItemIndicator } from '@radix-ui/react-menubar';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/utils';

export const MenuBarCheckboxItem = forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem>
>(function MenuBarCheckboxItem({ checked, children, className, ...props }, ref) {
  return (
    <CheckboxItem
      checked={checked}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  );
});
