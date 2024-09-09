import type { Meta, StoryObj } from '@storybook/react';

import { DropdownButton } from './DropdownButton';

type Story = StoryObj<typeof DropdownButton>;

export default { component: DropdownButton } as Meta<typeof DropdownButton>;

export const Default: Story = {
  args: {
    children: 'My Dropdown'
  }
};
