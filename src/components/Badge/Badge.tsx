import * as React from 'react';

import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-xs border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    defaultVariants: {
      variant: 'default'
    },
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
        outline: 'text-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }
    }
  }
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <div className={cn(badgeVariants({ variant }), className)} data-testid="badge" {...props} />;
};

export { Badge, badgeVariants };
export type { BadgeProps };
