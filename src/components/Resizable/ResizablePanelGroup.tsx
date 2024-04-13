import { PanelGroup } from 'react-resizable-panels';

import { cn } from '../../utils.js';

export type ResizablePanelGroupProps = React.ComponentProps<typeof PanelGroup>;

export const ResizablePanelGroup = ({ className, ...props }: ResizablePanelGroupProps) => (
  <PanelGroup
    className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
    {...props}
  />
);
