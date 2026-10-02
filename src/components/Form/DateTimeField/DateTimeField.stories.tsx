import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateTimeField } from './DateTimeField.tsx';

type Story = StoryObj<typeof DateTimeField>;

export default { component: DateTimeField } as Meta<typeof DateTimeField>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Date | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Appointment',
            name: 'appointment',
            setValue,
            value
          }}
        />
      );
    }
  ]
};

export const WithInitialValue: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Date | undefined>(new Date(2025, 0, 1, 10, 30));
      return (
        <Story
          args={{
            label: 'Appointment',
            name: 'appointment',
            setValue,
            value
          }}
        />
      );
    }
  ]
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Appointment',
    name: 'appointment',
    setValue: () => undefined,
    value: new Date(2025, 0, 1, 10, 30)
  }
};

export const WithError: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<Date | undefined>();
      return (
        <Story
          args={{
            error: ['This field is required'],
            label: 'Appointment',
            name: 'appointment',
            setValue,
            value
          }}
        />
      );
    }
  ]
};
