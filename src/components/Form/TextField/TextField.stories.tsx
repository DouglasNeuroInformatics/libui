import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';

type Story = StoryObj<typeof TextField>;

export default { component: TextField } as Meta<typeof TextField>;

export const Short: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Short Text Field',
            name: 'text',
            setValue,
            value,
            variant: 'short'
          }}
        />
      );
    }
  ]
};

export const Long: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Long Text Field',
            name: 'text',
            setValue,
            value,
            variant: 'long'
          }}
        />
      );
    }
  ]
};

export const Password: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Password Field',
            name: 'text',
            setValue,
            value,
            variant: 'password'
          }}
        />
      );
    }
  ]
};

export const Select: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
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
