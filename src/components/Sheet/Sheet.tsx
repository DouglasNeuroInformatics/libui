import { Close, Portal, Root, Trigger } from '@radix-ui/react-dialog';

import { SheetContent } from './SheetContent';
import { SheetDescription } from './SheetDescription';
import { SheetFooter } from './SheetFooter';
import { SheetHeader } from './SheetHeader';
import { SheetOverlay } from './SheetOverlay';
import { SheetTitle } from './SheetTitle';

export const Sheet = Object.assign(Root, {
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
