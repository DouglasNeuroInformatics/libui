import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../Input';
import { FieldContainer } from './FieldContainer';

type Story = StoryObj<typeof FieldContainer>;

export default { component: FieldContainer } as Meta<typeof FieldContainer>;

export const Default: Story = {
  args: {
    children: <Input />,
    description: 'This is an example description',
    error: 'This is an example error'
  }
};
