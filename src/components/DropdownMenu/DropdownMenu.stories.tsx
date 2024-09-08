import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { DropdownMenu } from './DropdownMenu';

type Story = StoryObj<typeof DropdownMenu>;

export default {
  component: DropdownMenu,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} as Meta<typeof DropdownMenu>;

export const Default: Story = {
  args: {
    children: (
      <div className="mx-24">
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-56">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              Profile
              <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Billing
              <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Settings
              <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Keyboard shortcuts
              <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>Team</DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>Email</DropdownMenu.Item>
                  <DropdownMenu.Item>Message</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>More...</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
            <DropdownMenu.Item>
              New Team
              <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
          <DropdownMenu.Item>Support</DropdownMenu.Item>
          <DropdownMenu.Item disabled>API</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            Log out
            <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </div>
    )
  }
};
