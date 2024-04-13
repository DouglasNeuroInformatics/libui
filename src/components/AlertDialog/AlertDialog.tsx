import { Root, Trigger } from '@radix-ui/react-alert-dialog';

import { AlertDialogAction } from './AlertDialogAction.js';
import { AlertDialogCancel } from './AlertDialogCancel.js';
import { AlertDialogContent } from './AlertDialogContent.js';
import { AlertDialogDescription } from './AlertDialogDescription.js';
import { AlertDialogFooter } from './AlertDialogFooter.js';
import { AlertDialogHeader } from './AlertDialogHeader.js';
import { AlertDialogOverlay } from './AlertDialogOverlay.js';
import { AlertDialogTitle } from './AlertDialogTitle.js';

export const AlertDialog = Object.assign(Root, {
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
  Content: AlertDialogContent,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Header: AlertDialogHeader,
  Overlay: AlertDialogOverlay,
  Title: AlertDialogTitle,
  Trigger
});
