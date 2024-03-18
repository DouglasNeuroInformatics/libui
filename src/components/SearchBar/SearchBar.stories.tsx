import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from './SearchBar';

type Story = StoryObj<typeof SearchBar>;

const meta: Meta<typeof SearchBar> = { component: SearchBar };

export default meta;

export const Default: Story = {};
