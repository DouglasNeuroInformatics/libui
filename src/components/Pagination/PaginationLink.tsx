import React from 'react';

import type { Simplify } from 'type-fest';

import { cn } from '../../utils.js';
import { type ButtonProps, buttonVariants } from '../Button/Button.js';

export type PaginationLinkProps = Simplify<
  Pick<ButtonProps, 'size'> &
    React.ComponentProps<'a'> & {
      isActive?: boolean;
    }
>;

export const PaginationLink = ({ children, className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: isActive ? 'outline' : 'ghost'
      }),
      className
    )}
    {...props}
  >
    {children}
  </a>
);
