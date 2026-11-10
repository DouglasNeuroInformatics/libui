import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumberField } from './NumberField.tsx';

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
            max: 10,
            min: 0,
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

export const SliderWithRange: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Slider Number Field',
            max: 10,
            min: 0,
            name: 'number-slider',
            setValue,
            showRange: true,
            value,
            variant: 'slider'
          }}
        />
      );
    }
  ]
};

export const SliderWithMarks: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Slider Number Field',
            marks: { 0: 'Not at all', 5: 'Moderately', 10: 'Extremely' },
            max: 10,
            min: 0,
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

export const SliderWithRangeAndMarks: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Slider Number Field',
            marks: { 0: 'No pain', 10: 'The worst pain that you can imagine' },
            max: 10,
            min: 0,
            name: 'number-slider',
            setValue,
            showRange: true,
            value,
            variant: 'slider'
          }}
        />
      );
    }
  ]
};

export const SliderWithDefaultValue: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            defaultValue: 3,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Slider Number Field',
            max: 10,
            min: 0,
            name: 'number-slider',
            setValue,
            showRange: true,
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

export const RadioTwoOptions: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Two Option Radio Field',
            name: 'number-radio-two-options',
            options: {
              0: 'The first in the morning',
              1: 'Any other'
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

export const RadioThreeOptions: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<number | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Three Option Radio Field',
            name: 'number-radio-three-options',
            options: {
              1: 'Never',
              2: 'Sometimes',
              3: 'Always'
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
