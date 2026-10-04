import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '#utils';

export const DropdownMenuSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => {
  return <DropdownMenuPrimitive.Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} ref={ref} {...props} />;
};
