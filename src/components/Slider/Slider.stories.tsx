import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from './Slider';

type Story = StoryObj<typeof Slider>;

export default { component: Slider } as Meta<typeof Slider>;

export const Default: Story = {};
