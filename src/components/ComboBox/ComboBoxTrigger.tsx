import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '#utils';

const ComboboxTrigger = ({ children, className, render, ...props }: ComboboxPrimitive.Trigger.Props) => {
  return (
    <ComboboxPrimitive.Trigger
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      data-slot="combobox-trigger"
      render={render} // This allows it to "become" the InputGroupButton
      {...props}
    >
      {children}
      {/* We move the icon here so it's always included, 
         unless you prefer passing it as children manually. 
      */}
      {!render && <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />}
    </ComboboxPrimitive.Trigger>
  );
};

export { ComboboxTrigger };
