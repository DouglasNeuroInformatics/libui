import type { Meta, StoryObj } from '@storybook/react';
import { CalendarDays } from 'lucide-react';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { HoverCard } from './HoverCard';

type Story = StoryObj<typeof HoverCard>;

export default { component: HoverCard } as Meta<typeof HoverCard>;

export const Default: Story = {
  args: {
    children: (
      <>
        <HoverCard.Trigger asChild>
          <Button variant="link">@nextjs</Button>
        </HoverCard.Trigger>
        <HoverCard.Content className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <Avatar.Image src="https://github.com/vercel.png" />
              <Avatar.Fallback>VC</Avatar.Fallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">The React Framework - created and maintained by @vercel.</p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">Joined December 2021</span>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </>
    )
  }
};
