import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './Separator.tsx';

type Story = StoryObj<typeof Separator>;

export default { component: Separator, tags: ['autodocs'] } as Meta<typeof Separator>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div>
        <div className="space-y-1">
          <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
          <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
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
