import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownButton } from './DropdownButton.tsx';

type Story = StoryObj<typeof DropdownButton>;

export default { component: DropdownButton } as Meta<typeof DropdownButton>;

export const Default: Story = {
  args: {
    children: 'My Dropdown'
  }
};
