import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '#utils';

import { InputGroup } from '../InputGroup/InputGroup.tsx';
import { InputGroupAddon } from '../InputGroup/InputGroupAddon.tsx';
import { InputGroupButton } from '../InputGroup/InputGroupButton.tsx';
import { InputGroupInput } from '../InputGroup/InputGroupInput.tsx';
import { ComboboxClear } from './ComboBoxClear.tsx';
import { ComboboxTrigger } from './ComboBoxTrigger.tsx';

const ComboboxInput = ({
  children,
  className,
  disabled = false,
  showClear = false,
  showTrigger = true,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showClear?: boolean;
  showTrigger?: boolean;
}) => {
  return (
    <InputGroup className={cn('w-auto', className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <ComboboxTrigger
            disabled={disabled}
            /* Now this works because ComboboxTrigger is expecting 'render' */
            render={
              <InputGroupButton
                className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
                data-slot="input-group-button"
                size="icon-xs"
                variant="ghost"
              >
                <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
              </InputGroupButton>
            }
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
};

export { ComboboxInput };
