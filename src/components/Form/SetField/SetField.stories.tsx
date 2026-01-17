import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { SetField } from './SetField.tsx';

type Fruit = 'apple' | 'banana' | 'blueberry' | 'mango';

type Story = StoryObj<typeof SetField<Fruit>>;

export default { component: SetField } as Meta<typeof SetField>;

export const Select: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Set<Fruit> | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Favorite Fruit',
            name: 'fruit',
            options: {
              apple: 'Apple',
              banana: 'Banana',
              blueberry: 'Blueberry',
              mango: 'Mango'
            },
            setValue,
            value,
            variant: 'select'
          }}
        />
      );
    }
  ]
};

export const Listbox: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Set<Fruit> | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Favorite Fruit',
            name: 'fruit',
            options: {
              apple: 'Apple',
              banana: 'Banana',
              blueberry: 'Blueberry',
              mango: 'Mango'
            },
            setValue,
            value,
            variant: 'listbox'
          }}
        />
      );
    }
  ]
};
