import * as React from 'react';

import { PanelGroup } from 'react-resizable-panels';

import { cn } from '@/utils';

export type ResizablePanelGroupProps = React.ComponentProps<typeof PanelGroup>;

export const ResizablePanelGroup = ({ className, ...props }: ResizablePanelGroupProps) => (
  <PanelGroup
    className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
    {...props}
  />
);
