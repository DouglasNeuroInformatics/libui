import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner.js';

type Story = StoryObj<typeof Spinner>;

export default {
  component: Spinner,
  parameters: {
    layout: 'centered'
  }
} as Meta<typeof Spinner>;

export const Default: Story = {};
