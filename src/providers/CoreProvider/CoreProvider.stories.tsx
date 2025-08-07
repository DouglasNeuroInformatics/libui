import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/Button';
import { useDestructiveAction } from '@/hooks/useDestructiveAction';
import { useNotificationsStore } from '@/hooks/useNotificationsStore';

import { CoreProvider } from './CoreProvider';

type Story = StoryObj<typeof CoreProvider>;

const Children = () => {
  const addNotification = useNotificationsStore((store) => store.addNotification);
  const destructiveAction = useDestructiveAction(() => alert('Delete'));
  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          addNotification({
            message: 'Hello World',
            type: 'info'
          });
        }}
      >
        Add Notification
      </Button>

      <Button type="button" variant="danger" onClick={destructiveAction}>
        Add Action
      </Button>
    </div>
  );
};

const meta: Meta<typeof CoreProvider> = {
  args: {
    children: <Children />
  },
  component: CoreProvider
};

export default meta;

export const Default: Story = {};
