import * as SelectPrimitive from '@radix-ui/react-select';

import { DropdownButton } from '../DropdownButton/DropdownButton.tsx';

export const SelectTrigger = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) => {
  return (
    <SelectPrimitive.Trigger asChild className={className} ref={ref} {...props}>
      <DropdownButton>{children}</DropdownButton>
    </SelectPrimitive.Trigger>
  );
};
