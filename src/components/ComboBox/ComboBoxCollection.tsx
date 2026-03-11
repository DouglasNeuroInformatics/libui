import { Combobox as ComboboxPrimitive } from '@base-ui/react';

const ComboboxCollection = ({ ...props }: ComboboxPrimitive.Collection.Props) => {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
};

export { ComboboxCollection };
