import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '#utils';

const ComboboxEmpty = ({ className, ...props }: ComboboxPrimitive.Empty.Props) => {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        'text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex',
        className
      )}
      data-slot="combobox-empty"
      {...props}
    />
  );
};

export { ComboboxEmpty };
