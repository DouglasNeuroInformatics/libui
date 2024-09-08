import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem';
import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuLabel } from './DropdownMenuLabel';
import { DropdownMenuRadioItem } from './DropdownMenuRadioItem';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuShortcut } from './DropdownMenuShortcut';
import { DropdownMenuSubContent } from './DropdownMenuSubContent';
import { DropdownMenuSubTrigger } from './DropdownMenuSubTrigger';

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
