import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '#utils';

const ComboboxLabel = ({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) => {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      data-slot="combobox-label"
      {...props}
    />
  );
};

export { ComboboxLabel };
