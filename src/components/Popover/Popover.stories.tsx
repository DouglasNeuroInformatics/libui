import { Fragment } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleHelpIcon } from 'lucide-react';

import { Button } from '../Button/Button.tsx';
import { Input } from '../Input/Input.tsx';
import { Label } from '../Label/Label.tsx';
import { Popover } from './Popover.tsx';

type Story = StoryObj<typeof Popover>;

export default {
  component: Popover,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} as Meta<typeof Popover>;

export const Form: Story = {
  args: {
    children: (
      <Fragment>
        <Popover.Trigger asChild>
          <Button variant="outline">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content className="w-80 p-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Dimensions</h4>
              <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input className="col-span-2 h-8" defaultValue="100%" id="width" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input className="col-span-2 h-8" defaultValue="300px" id="maxWidth" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input className="col-span-2 h-8" defaultValue="25px" id="height" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input className="col-span-2 h-8" defaultValue="none" id="maxHeight" />
              </div>
            </div>
          </div>
        </Popover.Content>
      </Fragment>
    )
  }
};

export const Icon: Story = {
  args: {
    children: (
      <Fragment>
        <Popover.Trigger asChild>
          <Button size="icon" variant="ghost">
            <CircleHelpIcon />
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-min text-sm whitespace-nowrap">Hello World</Popover.Content>
      </Fragment>
    )
  }
};
