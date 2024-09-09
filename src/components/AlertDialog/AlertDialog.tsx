import { Root, Trigger } from '@radix-ui/react-alert-dialog';

import { AlertDialogAction } from './AlertDialogAction';
import { AlertDialogCancel } from './AlertDialogCancel';
import { AlertDialogContent } from './AlertDialogContent';
import { AlertDialogDescription } from './AlertDialogDescription';
import { AlertDialogFooter } from './AlertDialogFooter';
import { AlertDialogHeader } from './AlertDialogHeader';
import { AlertDialogOverlay } from './AlertDialogOverlay';
import { AlertDialogTitle } from './AlertDialogTitle';

export const AlertDialog = Object.assign(Root.bind(null), {
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
