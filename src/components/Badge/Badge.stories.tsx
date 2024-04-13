import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge.js';

type Story = StoryObj<typeof Badge>;

export default { component: Badge, tags: ['autodocs'] } as Meta<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge'
  }
};
