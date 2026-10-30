import type { ComponentProps } from 'react';

import { Title } from '@radix-ui/react-dialog';

import { cn } from '#utils';

export const SheetTitle = ({ className, ref, ...props }: ComponentProps<typeof Title>) => {
  return <Title className={cn('text-foreground text-lg font-semibold', className)} ref={ref} {...props} />;
};
