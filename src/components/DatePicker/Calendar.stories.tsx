import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from './Calendar';

type Story = StoryObj<typeof Calendar>;

const today = new Date();

export default { component: Calendar } as Meta<typeof Calendar>;

export const Default: Story = {
  args: {
    month: today.getMonth(),
    onSelection: (date) => alert(`Selected: ${date}`),
    year: today.getFullYear()
  }
};
