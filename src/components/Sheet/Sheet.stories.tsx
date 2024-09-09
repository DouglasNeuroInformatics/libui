import { Fragment } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Sheet } from './Sheet';

type Story = StoryObj<typeof Sheet>;

export default { component: Sheet } as Meta<typeof Sheet>;

export const Default: Story = {
  args: {
    children: (
      <Fragment>
        <Sheet.Trigger asChild>
          <Button variant="outline">Open</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Edit profile</Sheet.Title>
            <Sheet.Description>Make changes to your profile here. Click save when you are done.</Sheet.Description>
          </Sheet.Header>
          <Sheet.Body className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Name
              </Label>
              <Input className="col-span-3" id="name" value="Pedro Duarte" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="username">
                Username
              </Label>
              <Input className="col-span-3" id="username" value="@peduarte" />
            </div>
          </Sheet.Body>
          <Sheet.Footer>
            <Sheet.Close asChild>
              <Button type="submit">Save changes</Button>
            </Sheet.Close>
          </Sheet.Footer>
        </Sheet.Content>
      </Fragment>
    )
  }
};
