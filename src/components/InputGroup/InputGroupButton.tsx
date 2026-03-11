import * as React from 'react';

import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '#utils';

import { Button } from '../Button/Button.tsx';

const inputGroupButtonVariants = cva('gap-2 text-sm flex items-center shadow-none', {
  defaultVariants: {
    size: 'xs'
  },
  variants: {
    size: {
      'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      'icon-xs': 'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
      sm: '',
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5"
    }
  }
});

const InputGroupButton = ({
  className,
  size = 'xs',
  type = 'button',
  variant = 'ghost',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> & VariantProps<typeof inputGroupButtonVariants>) => {
  return (
    <Button
      className={cn(inputGroupButtonVariants({ size }), className)}
      data-size={size}
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export { InputGroupButton };
