import type { Meta, StoryObj } from '@storybook/react-vite';

import { NotificationHub } from '../NotificationHub';
import { OneTimePasswordInput } from './OneTimePasswordInput';

type Story = StoryObj<typeof OneTimePasswordInput>;

export default {
  args: {
    onComplete: (code) => {
      alert(`Code: ${code}`);
    }
  },
  component: OneTimePasswordInput,
  decorators: [
    (Story) => {
      return (
        <>
          <NotificationHub />
          <Story />
        </>
      );
    }
  ]
} as Meta<typeof OneTimePasswordInput>;

export const Default: Story = {};
