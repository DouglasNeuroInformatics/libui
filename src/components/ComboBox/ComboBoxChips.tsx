import * as React from 'react';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { XIcon } from 'lucide-react';

import { cn } from '#utils';

import { Button } from '../Button/Button.tsx';

const ComboboxChips = ({
  className,
  ...props
}: ComboboxPrimitive.Chips.Props & React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips>) => {
  return (
    <ComboboxPrimitive.Chips
      className={cn(
        'dark:bg-input/30 border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive dark:has-aria-invalid:border-destructive/50 flex min-h-8 flex-wrap items-center gap-1 rounded-lg border bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:ring-3 has-aria-invalid:ring-3 has-data-[slot=combobox-chip]:px-1',
        className
      )}
      data-slot="combobox-chips"
      {...props}
    />
  );
};

const ComboboxChip = ({
  children,
  className,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) => {
  return (
    <ComboboxPrimitive.Chip
      className={cn(
        'bg-muted text-foreground flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0',
        className
      )}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
          render={
            <Button size="sm" variant="ghost">
              <XIcon className="pointer-events-none" />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  );
};

const ComboboxChipsInput = ({ className, ...props }: ComboboxPrimitive.Input.Props) => {
  return (
    <ComboboxPrimitive.Input
      className={cn('min-w-16 flex-1 outline-none', className)}
      data-slot="combobox-chip-input"
      {...props}
    />
  );
};

export { ComboboxChip, ComboboxChips, ComboboxChipsInput };
