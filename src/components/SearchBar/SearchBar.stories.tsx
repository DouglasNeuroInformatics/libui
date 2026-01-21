import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBar } from './SearchBar.tsx';

type Story = StoryObj<typeof SearchBar>;

const meta: Meta<typeof SearchBar> = { component: SearchBar };

export default meta;

export const Default: Story = {};
