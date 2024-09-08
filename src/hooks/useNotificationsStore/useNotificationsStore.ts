import { create } from 'zustand';

export type NotificationInterface = {
  id: number;
  message?: string;
  title?: string;
  type: 'error' | 'info' | 'success' | 'warning';
  variant?: 'critical' | 'standard';
};

export type NotificationsStore = {
  addNotification: (notification: Omit<NotificationInterface, 'id'>) => void;
  dismissNotification: (id: number) => void;
  notifications: NotificationInterface[];
};

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), ...notification }]
    }));
  },
  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id)
    }));
  },
  notifications: []
}));
