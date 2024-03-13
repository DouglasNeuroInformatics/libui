import { DownloadIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

type Story = StoryObj<typeof Button>;

export default { component: Button } satisfies Meta<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger'
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
};

export const Icon: Story = {
  args: {
    children: <DownloadIcon />,
    size: 'icon',
    variant: 'outline'
  }
};
