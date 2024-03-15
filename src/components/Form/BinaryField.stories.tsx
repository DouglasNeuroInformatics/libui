import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BinaryField } from './BinaryField';

type Story = StoryObj<typeof BinaryField>;

export default { component: BinaryField } as Meta<typeof BinaryField>;

export const Radio: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<boolean | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Binary Field',
            name: 'binary',
            setValue,
            value,
            variant: 'radio'
          }}
        />
      );
    }
  ]
};

export const Checkbox: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<boolean | undefined>(false);
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Binary Field',
            name: 'binary',
            setValue,
            value,
            variant: 'checkbox'
          }}
        />
      );
    }
  ]
};
