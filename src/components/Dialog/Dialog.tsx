import { Root, Trigger } from '@radix-ui/react-dialog';

import { DialogBody } from './DialogBody.tsx';
import { DialogContent } from './DialogContent.tsx';
import { DialogDescription } from './DialogDescription.tsx';
import { DialogFooter } from './DialogFooter.tsx';
import { DialogHeader } from './DialogHeader.tsx';
import { DialogTitle } from './DialogTitle.tsx';

export const Dialog = Object.assign(Root.bind(null), {
  Body: DialogBody,
  Content: DialogContent,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
  Title: DialogTitle,
  Trigger
});
