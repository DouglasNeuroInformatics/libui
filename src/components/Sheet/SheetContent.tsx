import * as React from 'react';

import { Close, Content, Portal } from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';

import { cn } from '#utils';

import { SheetOverlay } from './SheetOverlay.tsx';

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
      <SheetOverlay />
      <Content className={cn(sheetVariants({ side }), className)} ref={ref} {...props}>
        {children}
        <Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </Portal>
  );
});
