import { forwardRef } from 'react';

import { Trigger } from '@radix-ui/react-tooltip';

import { Button } from '../Button/Button.tsx';

import type { ButtonProps } from '../Button/Button.tsx';

export type TooltipTriggerProps = Omit<ButtonProps, 'asChild'>;

export const TooltipTrigger = forwardRef<React.ElementRef<typeof Trigger>, TooltipTriggerProps>(function TooltipTrigger(
  { variant = 'outline', ...props },
  ref
) {
  return (
    <Trigger asChild ref={ref}>
      <Button variant={variant} {...props} />
    </Trigger>
  );
});
