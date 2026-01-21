import { Corner, Root, Scrollbar, Thumb, Viewport } from '@radix-ui/react-scroll-area';

import { cn } from '#utils';

export const ScrollArea = ({ children, className, ...props }: React.ComponentProps<typeof Root>) => {
  return (
    <Root className={cn('relative overflow-hidden', className)} data-testid="scroll-area" {...props}>
      <Viewport className="h-full w-full rounded-[inherit]">{children}</Viewport>
      <Scrollbar
        className="flex h-full w-2.5 touch-none border-l border-l-transparent p-[1px] transition-colors select-none"
        orientation="vertical"
      >
        <Thumb className="bg-border relative flex-1 rounded-full" />
      </Scrollbar>
      <Corner />
    </Root>
  );
};
