import type { Meta, StoryObj } from '@storybook/react';

import { ThemeToggle } from './ThemeToggle';

type Story = StoryObj<typeof ThemeToggle>;

export default { component: ThemeToggle } as Meta<typeof ThemeToggle>;

export const Default: Story = {};
