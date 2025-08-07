import { DestructiveActionDialog } from './DestructiveActionDialog';
import { NotificationHub } from './NotificationHub';

export const CoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <DestructiveActionDialog />
      <NotificationHub />
      {children}
    </>
  );
};
