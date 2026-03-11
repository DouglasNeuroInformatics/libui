import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '#utils';

const ComboboxGroup = ({ className, ...props }: ComboboxPrimitive.Group.Props) => {
  return <ComboboxPrimitive.Group className={cn(className)} data-slot="combobox-group" {...props} />;
};

export { ComboboxGroup };
