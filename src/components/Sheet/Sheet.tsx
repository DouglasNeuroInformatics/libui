import { Close, Portal, Root, Trigger } from '@radix-ui/react-dialog';

import { SheetContent } from './SheetContent.js';
import { SheetDescription } from './SheetDescription.js';
import { SheetFooter } from './SheetFooter.js';
import { SheetHeader } from './SheetHeader.js';
import { SheetOverlay } from './SheetOverlay.js';
import { SheetTitle } from './SheetTitle.js';

export const Sheet = Object.assign(Root.bind(null), {
  Close,
  Content: SheetContent,
  Description: SheetDescription,
  Footer: SheetFooter,
  Header: SheetHeader,
  Overlay: SheetOverlay,
  Portal,
  Title: SheetTitle,
  Trigger
});
