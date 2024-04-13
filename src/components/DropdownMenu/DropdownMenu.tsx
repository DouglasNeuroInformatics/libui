import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem.js';
import { DropdownMenuContent } from './DropdownMenuContent.js';
import { DropdownMenuItem } from './DropdownMenuItem.js';
import { DropdownMenuLabel } from './DropdownMenuLabel.js';
import { DropdownMenuRadioItem } from './DropdownMenuRadioItem.js';
import { DropdownMenuSeparator } from './DropdownMenuSeparator.js';
import { DropdownMenuShortcut } from './DropdownMenuShortcut.js';
import { DropdownMenuSubContent } from './DropdownMenuSubContent.js';
import { DropdownMenuSubTrigger } from './DropdownMenuSubTrigger.js';

export const DropdownMenu = Object.assign(DropdownMenuPrimitive.Root.bind(null), {
  CheckboxItem: DropdownMenuCheckboxItem,
  Content: DropdownMenuContent,
  Group: DropdownMenuPrimitive.Group,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Portal: DropdownMenuPrimitive.Portal,
  RadioGroup: DropdownMenuPrimitive.RadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuPrimitive.Sub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  Trigger: DropdownMenuPrimitive.Trigger
});
