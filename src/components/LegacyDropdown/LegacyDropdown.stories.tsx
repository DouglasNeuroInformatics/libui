import type { Meta, StoryObj } from '@storybook/react';

import { LegacyDropdown } from './LegacyDropdown';

type Story = StoryObj<typeof LegacyDropdown>;

export default { component: LegacyDropdown } satisfies Meta<typeof LegacyDropdown>;

export const Default: Story = {
  args: {
    options: ['Option 1', 'Option 2'],
    title: 'Legacy Dropdown'
  }
};
