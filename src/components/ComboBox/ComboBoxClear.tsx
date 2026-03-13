import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { XIcon } from 'lucide-react';

import { cn } from '#utils';

import { InputGroupButton } from '../InputGroup/InputGroupButton.tsx';

const ComboboxClear = ({ className, ...props }: ComboboxPrimitive.Clear.Props) => {
  return (
    <ComboboxPrimitive.Clear
      className={cn(className)}
      data-slot="combobox-clear"
      {...props}
      render={
        <InputGroupButton size="icon-xs" variant="ghost">
          <XIcon className="pointer-events-none" />
        </InputGroupButton>
      }
    />
  );
};

export { ComboboxClear };
