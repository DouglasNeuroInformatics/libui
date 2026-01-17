import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button.tsx';
import { Card } from '../Card/Card.tsx';
import { Input } from '../Input/Input.tsx';
import { Label } from '../Label/Label.tsx';
import { Tabs } from './Tabs.tsx';

type Story = StoryObj<typeof Tabs>;

export default { component: Tabs, tags: ['autodocs'] } as Meta<typeof Tabs>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Tabs.List className="grid w-full grid-cols-2">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <Card>
            <Card.Header>
              <Card.Title>Account</Card.Title>
              <Card.Description>Make changes to your account here. Click save when you are done.</Card.Description>
            </Card.Header>
            <Card.Content className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input defaultValue="Pedro Duarte" id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input defaultValue="@peduarte" id="username" />
              </div>
            </Card.Content>
            <Card.Footer>
              <Button>Save changes</Button>
            </Card.Footer>
          </Card>
        </Tabs.Content>
        <Tabs.Content value="password">
          <Card>
            <Card.Header>
              <Card.Title>Password</Card.Title>
              <Card.Description>Change your password here. After saving, you will be logged out.</Card.Description>
            </Card.Header>
            <Card.Content className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </Card.Content>
            <Card.Footer>
              <Button>Save password</Button>
            </Card.Footer>
          </Card>
        </Tabs.Content>
      </>
    ),
    className: 'w-[400px]',
    defaultValue: 'account'
  }
};
