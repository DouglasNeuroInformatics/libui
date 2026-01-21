import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './Spinner.tsx';

type Story = StoryObj<typeof Spinner>;

export default {
  component: Spinner,
  parameters: {
    layout: 'centered'
  }
} as Meta<typeof Spinner>;

export const Default: Story = {};
