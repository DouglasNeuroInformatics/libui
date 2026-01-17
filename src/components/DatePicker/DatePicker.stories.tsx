import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from './DatePicker.tsx';

type Story = StoryObj<typeof DatePicker>;

export default { component: DatePicker, tags: ['autodocs'] } satisfies Meta<typeof DatePicker>;

export const Default: Story = {
  args: {
    onSelection: (date) => {
      alert(date);
    }
  }
};
