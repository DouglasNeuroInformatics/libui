import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LegacySelectDropdown } from './LegacySelectDropdown';

type Story = StoryObj<typeof LegacySelectDropdown>;

const meta: Meta<typeof LegacySelectDropdown> = { component: LegacySelectDropdown };

export default meta;

const options = [
  {
    key: 'o1',
    label: 'Option 1'
  },
  {
    key: 'o2',
    label: 'Option 2'
  },
  {
    key: 'o3',
    label: 'Option 3'
  }
];

export const Default: Story = {
  decorators: [
    (Story) => {
      const [selected, setSelected] = useState<typeof options>([]);
      return (
        <Story
          args={{
            options,
            selected,
            setSelected,
            title: 'My Select Dropdown'
          }}
        />
      );
    }
  ]
};
