import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionDropdown } from './ActionDropdown';

type Story = StoryObj<typeof ActionDropdown>;

export default { component: ActionDropdown } satisfies Meta<typeof ActionDropdown>;

export const Default: Story = {
  args: {
    onSelection(option) {
      alert(option);
    },
    options: ['Option 1', 'Option 2'],
    title: 'Action Dropdown'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onSelection(option) {
      alert(option);
    },
    options: ['Option 1', 'Option 2'],
    title: 'Action Dropdown'
  }
};
