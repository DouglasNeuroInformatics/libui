import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { CheckIcon } from 'lucide-react';

import { cn } from '#utils';

const ComboboxItem = ({ children, className, ...props }: ComboboxPrimitive.Item.Props) => {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="combobox-item"
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
            <CheckIcon className="pointer-events-none" />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  );
};

export { ComboboxItem };
