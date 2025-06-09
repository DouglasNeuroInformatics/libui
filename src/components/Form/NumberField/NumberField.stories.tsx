import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

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

export const Radio: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Slider Radio Field',
            name: 'number-radio',
            options: {
              1: 'Very Low',
              2: 'Low',
              3: 'Medium',
              4: 'High',
              5: 'Very High'
            },
            setValue,
            value,
            variant: 'radio'
          }}
        />
      );
    }
  ]
};

export const Select: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Slider Number Field',
            name: 'number-select',
            options: {
              1: 'Very Low',
              2: 'Low',
              3: 'Medium',
              4: 'High',
              5: 'Very High'
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
