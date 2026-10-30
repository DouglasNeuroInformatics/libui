import * as React from 'react';

import { Root } from '@radix-ui/react-radio-group';

import { cn } from '#utils';

import { RadioGroupItem } from './RadioGroupItem.tsx';

type RadioGroupProps = React.ComponentProps<typeof Root>;

const RadioGroupRoot: React.FC<RadioGroupProps> = ({ className, ...props }) => {
  return <Root className={cn('grid gap-2', className)} data-testid="radio-group" {...props} />;
};

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem
});

export type { RadioGroupProps };
