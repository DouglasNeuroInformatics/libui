import React from 'react';

import { cn } from '@/utils';

const CardRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardRoot(
  { className, ...props },
  ref
) {
  return (
    <div
      className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
      data-testid="card"
      ref={ref}
      {...props}
    />
  );
});

export const Card = Object.assign(CardRoot, {
  Content: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pt-0', className)} {...props} />
  ),
  Description: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
  Footer: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
  },
  Header: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
  Title: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
  )
});
