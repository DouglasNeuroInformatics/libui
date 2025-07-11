import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownMenu } from '../DropdownMenu';
import { Breadcrumb } from './Breadcrumb';

type Story = StoryObj<typeof Breadcrumb>;

export default { component: Breadcrumb } as Meta<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    children: (
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <DropdownMenu>
            <DropdownMenu.Trigger className="flex items-center gap-1">
              <Breadcrumb.Ellipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              <DropdownMenu.Item>Documentation</DropdownMenu.Item>
              <DropdownMenu.Item>Themes</DropdownMenu.Item>
              <DropdownMenu.Item>GitHub</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb.</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    )
  }
};
