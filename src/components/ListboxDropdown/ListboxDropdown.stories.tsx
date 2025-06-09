import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ListboxDropdown } from './ListboxDropdown';

type Story = StoryObj<typeof ListboxDropdown>;

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

export default {
  component: ListboxDropdown
} satisfies Meta<typeof ListboxDropdown>;

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
            title: 'My Listbox Dropdown'
          }}
        />
      );
    }
  ]
};
