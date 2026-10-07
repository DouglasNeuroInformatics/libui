import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '#utils';

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70'
);

export const Label = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>) => {
  return <LabelPrimitive.Root className={cn(labelVariants(), className)} ref={ref} {...props} />;
};
