import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { EnumField } from './EnumField';

type Story = StoryObj<typeof EnumField<Fruit>>;

type Fruit = 'apple' | 'banana' | 'blueberry' | 'mango';

export default { component: EnumField } as Meta<typeof EnumField>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Fruit | undefined>();
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
            value
          }}
        />
      );
    }
  ]
};
