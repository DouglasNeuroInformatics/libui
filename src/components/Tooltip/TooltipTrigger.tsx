import { Trigger } from '@radix-ui/react-tooltip';

import { Button } from '../Button/Button.tsx';

import type { ButtonProps } from '../Button/Button.tsx';

export type TooltipTriggerProps = Omit<ButtonProps, 'asChild' | 'ref'> & {
  ref?: React.Ref<React.ComponentRef<typeof Trigger>>;
};

export const TooltipTrigger = ({ ref, variant = 'outline', ...props }: TooltipTriggerProps) => {
  return (
    <Trigger asChild ref={ref}>
      <Button variant={variant} {...props} />
    </Trigger>
  );
};
