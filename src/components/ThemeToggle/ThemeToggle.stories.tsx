import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeToggle } from './ThemeToggle.tsx';

type Story = StoryObj<typeof ThemeToggle>;

export default { component: ThemeToggle, tags: ['autodocs'] } as Meta<typeof ThemeToggle>;

export const Default: Story = {};
