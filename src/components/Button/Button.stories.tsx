import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { DownloadIcon } from 'lucide-react';

import { Button } from './Button.js';

type Story = StoryObj<typeof Button>;

export default {
  args: {
    asChild: false,
    size: 'md'
  },
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

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

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="https://google.com">My Link</a>
  }
};
