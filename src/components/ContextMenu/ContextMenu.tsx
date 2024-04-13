import { Group, Portal, RadioGroup, Root, Sub, Trigger } from '@radix-ui/react-context-menu';

import { ContextMenuCheckboxItem } from './ContextMenuCheckboxItem.js';
import { ContextMenuContent } from './ContextMenuContent.js';
import { ContextMenuItem } from './ContextMenuItem.js';
import { ContextMenuLabel } from './ContextMenuLabel.js';
import { ContextMenuRadioItem } from './ContextMenuRadioItem.js';
import { ContextMenuSeparator } from './ContextMenuSeparator.js';
import { ContextMenuShortcut } from './ContextMenuShortcut.js';
import { ContextMenuSubContent } from './ContextMenuSubContent.js';
import { ContextMenuSubTrigger } from './ContextMenuSubTrigger.js';

export const ContextMenu = Object.assign(Root.bind(null), {
  CheckboxItem: ContextMenuCheckboxItem,
  Content: ContextMenuContent,
  Group,
  Item: ContextMenuItem,
  Label: ContextMenuLabel,
  Portal,
  RadioGroup,
  RadioItem: ContextMenuRadioItem,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Sub,
  SubContent: ContextMenuSubContent,
  SubTrigger: ContextMenuSubTrigger,
  Trigger
});
