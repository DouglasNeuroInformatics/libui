import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '#utils';

const ComboboxList = ({ className, ...props }: ComboboxPrimitive.List.Props) => {
  return (
    <ComboboxPrimitive.List
      className={cn(
        'no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
        className
      )}
      data-slot="combobox-list"
      {...props}
    />
  );
};

export { ComboboxList };
