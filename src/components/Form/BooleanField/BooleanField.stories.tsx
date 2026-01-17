import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { BooleanField } from './BooleanField.tsx';

type Story = StoryObj<typeof BooleanField>;

export default { component: BooleanField } as Meta<typeof BooleanField>;

export const Radio: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<boolean | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Boolean Field',
            name: 'boolean',
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
            label: 'Boolean Field',
            name: 'boolean',
            setValue,
            value,
            variant: 'checkbox'
          }}
        />
      );
    }
  ]
};
