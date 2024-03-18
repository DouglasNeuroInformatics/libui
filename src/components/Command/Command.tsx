import React from 'react';

import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/utils';

import { CommandEmpty } from './CommandEmpty';
import { CommandGroup } from './CommandGroup';
import { CommandInput } from './CommandInput';
import { CommandItem } from './CommandItem';
import { CommandList } from './CommandList';
import { CommandSeparator } from './CommandSeparator';
import { CommandShortcut } from './CommandShortcut';

const CommandRoot = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(function Command({ className, ...props }, ref) {
  return (
    <CommandPrimitive
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export const Command = Object.assign(CommandRoot, {
  Empty: CommandEmpty,
  Group: CommandGroup,
  Input: CommandInput,
  Item: CommandItem,
  List: CommandList,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut
});
