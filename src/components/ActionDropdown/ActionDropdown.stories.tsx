import type { Meta, StoryObj } from '@storybook/react';

import { ActionDropdown } from './ActionDropdown.js';

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
