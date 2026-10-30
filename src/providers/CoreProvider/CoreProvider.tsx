import type { FC, ReactNode } from 'react';

import { DestructiveActionDialog } from './DestructiveActionDialog.tsx';
import { NotificationHub } from './NotificationHub.tsx';

export const CoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <DestructiveActionDialog />
      <NotificationHub />
      {children}
    </>
  );
};
