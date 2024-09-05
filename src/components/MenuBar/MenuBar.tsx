import type React from 'react';

import { Group, Menu, Portal, RadioGroup, Sub } from '@radix-ui/react-menubar';
import type { MenubarMenuProps } from '@radix-ui/react-menubar';

import { MenuBarCheckboxItem } from './MenuBarCheckboxItem.js';
import { MenuBarContent } from './MenuBarContent.js';
import { MenuBarItem } from './MenuBarItem.js';
import { MenuBarLabel } from './MenuBarLabel.js';
import { MenuBarRadioItem } from './MenuBarRadioItem.js';
import { MenuBarRoot } from './MenuBarRoot.js';
import { MenuBarSeparator } from './MenuBarSeparator.js';
import { MenuBarShortcut } from './MenuBarShortcut.js';
import { MenuBarSubContent } from './MenuBarSubContent.js';
import { MenuBarSubTrigger } from './MenuBarSubTrigger.js';
import { MenuBarTrigger } from './MenuBarTrigger.js';

export const MenuBar = Object.assign(MenuBarRoot, {
  CheckboxItem: MenuBarCheckboxItem,
  Content: MenuBarContent,
  Group: Group,
  Item: MenuBarItem,
  Label: MenuBarLabel,
  Menu: Menu as React.ComponentType<MenubarMenuProps>,
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
