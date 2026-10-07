import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '#utils';

export const DropdownMenuLabel = ({
  className,
  inset,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
      ref={ref}
      {...props}
    />
  );
};
