import { Combobox as ComboboxPrimitive } from '@base-ui/react';

const ComboboxValue = ({ ...props }: ComboboxPrimitive.Value.Props) => {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
};

export { ComboboxValue };
