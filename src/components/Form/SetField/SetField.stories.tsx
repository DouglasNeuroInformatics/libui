import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { SetField } from './SetField.tsx';

type Fruit = 'apple' | 'banana' | 'blueberry' | 'mango';

type FruitOrNone = 'none' | Fruit;

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

export const WithExclusiveOption: StoryObj<typeof SetField<FruitOrNone>> = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Set<FruitOrNone> | undefined>();
      return (
        <Story
          args={{
            description: 'When "None of the above" is selected, all other options are disabled.',
            exclusiveOptions: ['none'],
            label: 'Favorite Fruit',
            name: 'fruit',
            options: {
              apple: 'Apple',
              banana: 'Banana',
              blueberry: 'Blueberry',
              mango: 'Mango',
              none: 'None of the above'
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

export const SelectWithExclusiveOption: StoryObj<typeof SetField<FruitOrNone>> = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Set<FruitOrNone> | undefined>();
      return (
        <Story
          args={{
            description: 'When "None of the above" is selected, all other options are disabled.',
            exclusiveOptions: ['none'],
            label: 'Favorite Fruit',
            name: 'fruit',
            options: {
              apple: 'Apple',
              banana: 'Banana',
              blueberry: 'Blueberry',
              mango: 'Mango',
              none: 'None of the above'
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
