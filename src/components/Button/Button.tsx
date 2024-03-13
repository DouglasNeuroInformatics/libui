import React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type { Simplify } from 'type-fest';

import { cn } from '@/utils';

export const BUTTON_ICON_SIZE = {
  lg: 18,
  md: 16,
  sm: 14
};

export const buttonVariants = cva(
  'flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'md',
      variant: 'primary'
    },
    variants: {
      size: {
        icon: 'h-9 w-9',
        lg: 'h-10 rounded-md px-8',
        md: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs'
      },
      variant: {
        danger: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'border border-input bg-inherit shadow-sm',
        primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        secondary: 'bg-secondary border text-secondary-foreground shadow-sm hover:bg-secondary/80'
      }
    }
  }
);

export type ButtonProps = Simplify<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      /** @deprecated - use children   */
      label?: string;
    }
>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild = false, children, className, label, size = 'md', variant = 'primary', ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
      {label}
      {children}
    </Comp>
  );
});
