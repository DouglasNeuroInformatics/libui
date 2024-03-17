import { Group, Menu, Portal, RadioGroup, Sub } from '@radix-ui/react-menubar';

import { MenuBarCheckboxItem } from './MenuBarCheckboxItem';
import { MenuBarContent } from './MenuBarContent';
import { MenuBarItem } from './MenuBarItem';
import { MenuBarLabel } from './MenuBarLabel';
import { MenuBarRadioItem } from './MenuBarRadioItem';
import { MenuBarRoot } from './MenuBarRoot';
import { MenuBarSeparator } from './MenuBarSeparator';
import { MenuBarShortcut } from './MenuBarShortcut';
import { MenuBarSubContent } from './MenuBarSubContent';
import { MenuBarSubTrigger } from './MenuBarSubTrigger';
import { MenuBarTrigger } from './MenuBarTrigger';

export const MenuBar = Object.assign(MenuBarRoot, {
  CheckboxItem: MenuBarCheckboxItem,
  Content: MenuBarContent,
  Group: Group,
  Item: MenuBarItem,
  Label: MenuBarLabel,
  Menu: Menu,
  Portal: Portal,
  RadioGroup: RadioGroup,
  RadioItem: MenuBarRadioItem,
  Separator: MenuBarSeparator,
  Shortcut: MenuBarShortcut,
  Sub: Sub,
  SubContent: MenuBarSubContent,
  SubTrigger: MenuBarSubTrigger,
  Trigger: MenuBarTrigger
});
