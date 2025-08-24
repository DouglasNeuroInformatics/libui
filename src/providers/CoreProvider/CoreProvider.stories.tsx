import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input, Label } from '@/components';
import { Button } from '@/components/Button';
import { useDestructiveAction } from '@/hooks/useDestructiveAction';
import { useNotificationsStore } from '@/hooks/useNotificationsStore';

import { CoreProvider } from './CoreProvider';

type Story = StoryObj<typeof CoreProvider>;

const NotificationsChildren = () => {
  const addNotification = useNotificationsStore((store) => store.addNotification);

  return (
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
  );
};

const DestructiveActionsChildren = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const destructiveAction = useDestructiveAction({
    action: (event: React.MouseEvent<HTMLButtonElement>) => {
      alert(`Delete at Event Time: ${event.timeStamp}`);
    },
    description: description || undefined,
    title: title || undefined
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>Title</Label>
        <Input value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Input value={description} onChange={(event) => setDescription(event.target.value)} />
      </div>
      <Button className="w-min" type="button" variant="danger" onClick={destructiveAction}>
        Add Action
      </Button>
    </div>
  );
};

const meta: Meta<typeof CoreProvider> = {
  component: CoreProvider
};

export default meta;

export const Notifications: Story = {
  args: {
    children: <NotificationsChildren />
  }
};

export const DescructiveActions: Story = {
  args: {
    children: <DestructiveActionsChildren />
  }
};
