import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '#utils';

const ComboboxSeparator = ({ className, ...props }: ComboboxPrimitive.Separator.Props) => {
  return (
    <ComboboxPrimitive.Separator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
};

export { ComboboxSeparator };
