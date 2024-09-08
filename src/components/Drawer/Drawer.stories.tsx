import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button.js';
import { Drawer } from './Drawer.js';

type Story = StoryObj<typeof Drawer>;

export default { component: Drawer } as Meta<typeof Drawer>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Drawer.Trigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <div className="mx-auto w-full max-w-sm">
            <Drawer.Header>
              <Drawer.Title>Title</Drawer.Title>
              <Drawer.Description>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button variant="outline">Close</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </div>
        </Drawer.Content>
      </>
    )
  }
};
