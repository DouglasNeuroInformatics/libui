import { DestructiveActionDialog } from './DestructiveActionDialog.tsx';
import { NotificationHub } from './NotificationHub.tsx';

export const CoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <DestructiveActionDialog />
      <NotificationHub />
      {children}
    </>
  );
};
