import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '#utils';

export const Separator = ({
  className,
  decorative = true,
  orientation = 'horizontal',
  ref,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'bg-border shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      data-testid="separator"
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  );
};
