import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider.js';

type Story = StoryObj<typeof Slider>;

export default { component: Slider } as Meta<typeof Slider>;

export const Default: Story = {};
