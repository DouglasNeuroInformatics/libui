import type { Meta, StoryObj } from '@storybook/react-vite';

import { CoreProvider } from '@/providers/CoreProvider';

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
        <CoreProvider>
          <Story />
        </CoreProvider>
      );
    }
  ]
} as Meta<typeof OneTimePasswordInput>;

export const Default: Story = {};
