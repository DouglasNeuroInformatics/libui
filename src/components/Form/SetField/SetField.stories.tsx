import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SetField } from './SetField';

type Fruit = 'apple' | 'banana' | 'blueberry' | 'mango';

type Story = StoryObj<typeof SetField<Fruit>>;

export default { component: SetField } as Meta<typeof SetField>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Fruit[] | undefined>();
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
