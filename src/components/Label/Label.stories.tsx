import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './Label';

type Story = StoryObj<typeof Label>;

export default { component: Label, tags: ['autodocs'] } as Meta<typeof Label>;

export const Default: Story = {
  args: {
    children: 'My Label'
  }
};
