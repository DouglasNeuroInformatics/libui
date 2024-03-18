import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Dialog } from './Dialog';

type Story = StoryObj<typeof Dialog>;

export default {
  args: {
    children: (
      <>
        <Dialog.Trigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </Dialog.Trigger>
        <Dialog.Content className="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>Make changes to your profile here. Click save when you are done.</Dialog.Description>
          </Dialog.Header>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Name
              </Label>
              <Input className="col-span-3" id="name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="username">
                Username
              </Label>
              <Input className="col-span-3" id="username" />
            </div>
          </div>
          <Dialog.Footer>
            <Button type="submit">Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </>
    )
  },
  component: Dialog
} as Meta<typeof Dialog>;

export const Default: Story = {};
