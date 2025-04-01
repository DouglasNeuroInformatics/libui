import * as React from 'react';

import { cn } from '@/utils';

const CardRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardRoot(
  { className, ...props },
  ref
) {
  return (
    <div
      className={cn('bg-card text-card-foreground rounded-xl border shadow-sm', className)}
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
    <p className={cn('text-muted-foreground text-sm', className)} {...props} />
  ),
  Footer: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
  },
  Header: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
  Title: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn('leading-none font-semibold tracking-tight', className)} {...props}>
      {children}
    </h3>
  )
});
