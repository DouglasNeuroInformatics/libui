import * as React from 'react';

import { Provider, Root } from '@radix-ui/react-tooltip';

export type TooltipRootProps = {
  /** The tooltip trigger and content */
  children: React.ReactNode;
  /** The duration from when the mouse enters a tooltip trigger until the tooltip opens. */
  delayDuration?: number;
  /** Event handler called when the open state of the tooltip changes. */
  onOpenChange?: (open: boolean) => void;
  /** The controlled open state of the tooltip. Must be used in conjunction with onOpenChange. */
  open?: boolean;
  /** How much time a user has to enter another trigger without incurring a delay again. */
  skipDelayDuration?: number;
};

export const TooltipRoot = ({
  children,
  delayDuration = 0,
  onOpenChange,
  open,
  skipDelayDuration = 300
}: TooltipRootProps) => {
  return (
    <Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <Root open={open} onOpenChange={onOpenChange}>
        {children}
      </Root>
    </Provider>
  );
};
