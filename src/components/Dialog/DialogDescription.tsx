import * as React from 'react';

import { Description } from '@radix-ui/react-dialog';

import { cn } from '@/utils';

export const DialogDescription = ({ className, ...props }: React.ComponentProps<typeof Description>) => {
  return <Description className={cn('text-muted-foreground text-sm', className)} {...props} />;
};
