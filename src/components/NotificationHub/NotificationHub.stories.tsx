import type { Meta, StoryObj } from '@storybook/react';

import { useNotificationsStore } from '../../hooks/useNotificationsStore.js';
import { Button } from '../Button/Button.js';
import { NotificationHub } from './NotificationHub.js';

type Story = StoryObj<typeof NotificationHub>;

const meta: Meta<typeof NotificationHub> = {
  component: NotificationHub,
  decorators: [
    (Story) => {
      const notifications = useNotificationsStore();
      return (
        <div className="border">
          <Story />
          <Button
            label="Add Notification"
            type="button"
            onClick={() => {
              notifications.addNotification({
                message: `Notification ${notifications.notifications.length}`,
                type: 'info'
              });
            }}
          />
        </div>
      );
    }
  ]
};

export default meta;

export const Default: Story = {
  args: {
    timeout: 100000
  }
};
