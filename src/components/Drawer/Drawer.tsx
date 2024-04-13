import React from 'react';

import { Drawer as DrawerPrimitive } from 'vaul';

import { DrawerContent } from './DrawerContent.js';
import { DrawerDescription } from './DrawerDescription.js';
import { DrawerFooter } from './DrawerFooter.js';
import { DrawerHeader } from './DrawerHeader.js';
import { DrawerTitle } from './DrawerTitle.js';

const DrawerRoot = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);

export const Drawer = Object.assign(DrawerRoot, {
  Close: DrawerPrimitive.Close,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Trigger: DrawerPrimitive.Trigger
});
