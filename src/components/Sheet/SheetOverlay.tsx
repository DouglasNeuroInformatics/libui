import { Overlay } from '@radix-ui/react-dialog';

import { cn } from '#utils';

export const SheetOverlay = ({ className, ref, ...props }: React.ComponentProps<typeof Overlay>) => {
  return (
    <Overlay
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
        className
      )}
      {...props}
      ref={ref}
    />
  );
};
