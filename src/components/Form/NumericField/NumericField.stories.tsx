import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NumericField } from './NumericField';

type Story = StoryObj<typeof NumericField>;

export default { component: NumericField } as Meta<typeof NumericField>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Default Numeric Field',
            name: 'numeric-default',
            setValue,
            value,
            variant: 'default'
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
            label: 'Slider Numeric Field',
            name: 'numeric-slider',
            setValue,
            value,
            variant: 'slider'
          }}
        />
      );
    }
  ]
};
