import React from 'react';

import { Trigger } from '@radix-ui/react-popover';

import { Button, type ButtonProps } from '../Button';

export type PopoverTriggerProps = Omit<ButtonProps, 'asChild'>;

export const PopoverTrigger = React.forwardRef<React.ElementRef<typeof Trigger>, PopoverTriggerProps>(
  function PopoverTrigger({ variant = 'outline', ...props }, ref) {
    return (
      <Trigger asChild ref={ref}>
        <Button variant={variant} {...props} />
      </Trigger>
    );
  }
);
