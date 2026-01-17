import { forwardRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { DropdownButton } from '../DropdownButton/DropdownButton.tsx';

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ children, className, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger asChild className={className} ref={ref} {...props}>
      <DropdownButton>{children}</DropdownButton>
    </SelectPrimitive.Trigger>
  );
});
