import type { Meta, StoryObj } from '@storybook/react';

import { ThemeToggle } from './ThemeToggle.js';

type Story = StoryObj<typeof ThemeToggle>;

export default { component: ThemeToggle, tags: ['autodocs'] } as Meta<typeof ThemeToggle>;

export const Default: Story = {};
