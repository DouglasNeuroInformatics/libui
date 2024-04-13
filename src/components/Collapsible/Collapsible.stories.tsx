import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDownIcon } from 'lucide-react';

import { Button } from '../Button/Button.js';
import { Collapsible } from './Collapsible.js';

type Story = StoryObj<typeof Collapsible>;

export default { component: Collapsible } as Meta<typeof Collapsible>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <Story
          args={{
            children: (
              <React.Fragment>
                <div className="flex items-center justify-between space-x-4 px-4">
                  <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                  <Collapsible.Trigger asChild>
                    <Button size="sm" variant="ghost">
                      <ChevronsUpDownIcon className="h-4 w-4 opacity-50" />
                    </Button>
                  </Collapsible.Trigger>
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@radix-ui/primitives</div>
                <Collapsible.Content className="space-y-2">
                  <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@radix-ui/colors</div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@stitches/react</div>
                </Collapsible.Content>
              </React.Fragment>
            ),
            className: 'w-[350px] space-y-2',
            onOpenChange: setIsOpen,
            open: isOpen
          }}
        />
      );
    }
  ]
};
