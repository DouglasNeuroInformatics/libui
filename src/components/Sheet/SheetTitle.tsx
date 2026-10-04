import { Title } from '@radix-ui/react-dialog';

import { cn } from '#utils';

export const SheetTitle = ({ className, ref, ...props }: React.ComponentProps<typeof Title>) => {
  return <Title className={cn('text-foreground text-lg font-semibold', className)} ref={ref} {...props} />;
};
