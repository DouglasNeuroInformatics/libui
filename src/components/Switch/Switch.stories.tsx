import { Label } from '@radix-ui/react-label';
import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch.js';

type Story = StoryObj<typeof Switch>;

export default { component: Switch, tags: ['autodocs'] } as Meta<typeof Switch>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2">
        <Story args={{ id: 'airplane-mode' }} />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    )
  ]
};
