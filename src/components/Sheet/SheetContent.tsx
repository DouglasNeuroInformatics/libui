import React from 'react';

import { Close, Content, Overlay, Portal } from '@radix-ui/react-dialog';
import { type VariantProps, cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';

import { cn } from '@/utils';

export const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    defaultVariants: {
      side: 'right'
    },
    variants: {
      side: {
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top'
      }
    }
  }
);

export type SheetContentProps = React.ComponentPropsWithoutRef<typeof Content> & VariantProps<typeof sheetVariants>;

export const SheetContent = React.forwardRef<React.ElementRef<typeof Content>, SheetContentProps>(function SheetContent(
  { children, className, side = 'right', ...props },
  ref
) {
  return (
    <Portal>
      <Overlay />
      <Content className={cn(sheetVariants({ side }), className)} ref={ref} {...props}>
        {children}
        <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </Portal>
  );
});
