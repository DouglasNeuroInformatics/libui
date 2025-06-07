import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

type Story = StoryObj<typeof Badge>;

export default { component: Badge, tags: ['autodocs'] } as Meta<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge'
  }
};
