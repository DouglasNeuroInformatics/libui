import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextArea } from './TextArea.tsx';

type Story = StoryObj<typeof TextArea>;

export default { component: TextArea, tags: ['autodocs'] } as Meta<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.'
  }
};
