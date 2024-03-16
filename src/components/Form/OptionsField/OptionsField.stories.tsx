import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OptionsField } from './OptionsField';

type Story = StoryObj<typeof OptionsField<Fruit>>;

type Fruit = 'apple' | 'banana' | 'blueberry' | 'mango';

export default { component: OptionsField } as Meta<typeof OptionsField>;

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
