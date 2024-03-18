import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NumberField } from './NumberField';

type Story = StoryObj<typeof NumberField>;

export default { component: NumberField } as Meta<typeof NumberField>;

export const Input: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Default Number Field',
            name: 'number-default',
            setValue,
            value,
            variant: 'input'
          }}
        />
      );
    }
  ]
};

export const Slider: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Slider Number Field',
            name: 'number-slider',
            setValue,
            value,
            variant: 'slider'
          }}
        />
      );
    }
  ]
};
