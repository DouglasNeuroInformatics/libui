import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem.tsx';
import { DropdownMenuContent } from './DropdownMenuContent.tsx';
import { DropdownMenuItem } from './DropdownMenuItem.tsx';
import { DropdownMenuLabel } from './DropdownMenuLabel.tsx';
import { DropdownMenuRadioItem } from './DropdownMenuRadioItem.tsx';
import { DropdownMenuSeparator } from './DropdownMenuSeparator.tsx';
import { DropdownMenuShortcut } from './DropdownMenuShortcut.tsx';
import { DropdownMenuSubContent } from './DropdownMenuSubContent.tsx';
import { DropdownMenuSubTrigger } from './DropdownMenuSubTrigger.tsx';

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
