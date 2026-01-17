import { Close, Portal, Root, Trigger } from '@radix-ui/react-dialog';

import { SheetBody } from './SheetBody.tsx';
import { SheetContent } from './SheetContent.tsx';
import { SheetDescription } from './SheetDescription.tsx';
import { SheetFooter } from './SheetFooter.tsx';
import { SheetHeader } from './SheetHeader.tsx';
import { SheetTitle } from './SheetTitle.tsx';

export const Sheet = Object.assign(Root.bind(null), {
  Body: SheetBody,
  Close,
  Content: SheetContent,
  Description: SheetDescription,
  Footer: SheetFooter,
  Header: SheetHeader,
  Portal,
  Title: SheetTitle,
  Trigger
});
