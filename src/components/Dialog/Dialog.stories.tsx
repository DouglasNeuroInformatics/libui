import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button.js';
import { Input } from '../Input/Input.js';
import { Label } from '../Label/Label.js';
import { Dialog } from './Dialog.js';

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
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" />
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
