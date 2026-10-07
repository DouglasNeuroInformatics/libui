import { Description } from '@radix-ui/react-dialog';

import { cn } from '#utils';

export const SheetDescription = ({ className, ref, ...props }: React.ComponentProps<typeof Description>) => {
  return <Description className={cn('text-muted-foreground text-sm', className)} ref={ref} {...props} />;
};
