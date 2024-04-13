import React from 'react';

import { Command as CommandPrimitive } from 'cmdk';
import type { Simplify } from 'type-fest';

import { cn } from '../../utils.js';
import { CommandEmpty } from './CommandEmpty.js';
import { CommandGroup } from './CommandGroup.js';
import { CommandInput } from './CommandInput.js';
import { CommandItem } from './CommandItem.js';
import { CommandList } from './CommandList.js';
import { CommandSeparator } from './CommandSeparator.js';
import { CommandShortcut } from './CommandShortcut.js';

type CommandRootProps = Simplify<React.ComponentPropsWithoutRef<typeof CommandPrimitive>>;

const CommandRoot = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, CommandRootProps>(function Command(
  { className, ...props },
  ref
) {
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
