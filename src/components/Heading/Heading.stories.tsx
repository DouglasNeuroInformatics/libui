import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

type Story = StoryObj<typeof Heading>;

const exampleText = 'Whereas disregard and contempt for human rights have resulted';

export default { component: Heading } as Meta<typeof Heading>;

export const Heading1: Story = {
  args: {
    children: exampleText,
    variant: 'h1'
  }
};

export const Heading2: Story = {
  args: {
    children: exampleText,
    variant: 'h2'
  }
};

export const Heading3: Story = {
  args: {
    children: exampleText,
    variant: 'h3'
  }
};

export const Heading4: Story = {
  args: {
    children: exampleText,
    variant: 'h4'
  }
};
