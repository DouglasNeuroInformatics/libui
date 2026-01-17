import * as React from 'react';

import { Title } from '@radix-ui/react-dialog';

import { cn } from '#utils';

export const DialogTitle = ({ className, ...props }: React.ComponentProps<typeof Title>) => {
  return <Title className={cn('text-lg leading-none font-semibold tracking-tight', className)} {...props} />;
};
