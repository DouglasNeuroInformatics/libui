import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './Separator.js';

type Story = StoryObj<typeof Separator>;

export default { component: Separator, tags: ['autodocs'] } as Meta<typeof Separator>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
          <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
        </div>
        <Story args={{ className: 'my-4' }} />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    )
  ]
};
