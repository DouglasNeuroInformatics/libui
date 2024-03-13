import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

type Story = StoryObj<typeof Input>;

export default { component: Input } as Meta<typeof Input>;

export const Default: Story = {};
