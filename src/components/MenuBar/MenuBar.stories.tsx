import type { Meta, StoryObj } from '@storybook/react';

import { MenuBar } from './MenuBar';

type Story = StoryObj<typeof MenuBar>;

export default { component: MenuBar } as Meta<typeof MenuBar>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuBar.Menu>
          <MenuBar.Trigger>File</MenuBar.Trigger>
          <MenuBar.Content>
            <MenuBar.Item>
              New Tab <MenuBar.Shortcut>⌘T</MenuBar.Shortcut>
            </MenuBar.Item>
            <MenuBar.Item>
              New Window <MenuBar.Shortcut>⌘N</MenuBar.Shortcut>
            </MenuBar.Item>
            <MenuBar.Item disabled>New Incognito Window</MenuBar.Item>
            <MenuBar.Separator />
            <MenuBar.Sub>
              <MenuBar.SubTrigger>Share</MenuBar.SubTrigger>
              <MenuBar.SubContent>
                <MenuBar.Item>Email link</MenuBar.Item>
                <MenuBar.Item>Messages</MenuBar.Item>
                <MenuBar.Item>Notes</MenuBar.Item>
              </MenuBar.SubContent>
            </MenuBar.Sub>
            <MenuBar.Separator />
            <MenuBar.Item>
              Print... <MenuBar.Shortcut>⌘P</MenuBar.Shortcut>
            </MenuBar.Item>
          </MenuBar.Content>
        </MenuBar.Menu>
        <MenuBar.Menu>
          <MenuBar.Trigger>Edit</MenuBar.Trigger>
          <MenuBar.Content>
            <MenuBar.Item>
              Undo <MenuBar.Shortcut>⌘Z</MenuBar.Shortcut>
            </MenuBar.Item>
            <MenuBar.Item>
              Redo <MenuBar.Shortcut>⇧⌘Z</MenuBar.Shortcut>
            </MenuBar.Item>
            <MenuBar.Separator />
            <MenuBar.Sub>
              <MenuBar.SubTrigger>Find</MenuBar.SubTrigger>
              <MenuBar.SubContent>
                <MenuBar.Item>Search the web</MenuBar.Item>
                <MenuBar.Separator />
                <MenuBar.Item>Find...</MenuBar.Item>
                <MenuBar.Item>Find Next</MenuBar.Item>
                <MenuBar.Item>Find Previous</MenuBar.Item>
              </MenuBar.SubContent>
            </MenuBar.Sub>
            <MenuBar.Separator />
            <MenuBar.Item>Cut</MenuBar.Item>
            <MenuBar.Item>Copy</MenuBar.Item>
            <MenuBar.Item>Paste</MenuBar.Item>
          </MenuBar.Content>
        </MenuBar.Menu>
        <MenuBar.Menu>
          <MenuBar.Trigger>View</MenuBar.Trigger>
          <MenuBar.Content>
            <MenuBar.CheckboxItem>Always Show Bookmarks Bar</MenuBar.CheckboxItem>
            <MenuBar.CheckboxItem checked>Always Show Full URLs</MenuBar.CheckboxItem>
            <MenuBar.Separator />
            <MenuBar.Item inset>
              Reload <MenuBar.Shortcut>⌘R</MenuBar.Shortcut>
            </MenuBar.Item>
            <MenuBar.Item disabled inset>
              Force Reload <MenuBar.Shortcut>⇧⌘R</MenuBar.Shortcut>
            </MenuBar.Item>
            <MenuBar.Separator />
            <MenuBar.Item inset>Toggle Fullscreen</MenuBar.Item>
            <MenuBar.Separator />
            <MenuBar.Item inset>Hide Sidebar</MenuBar.Item>
          </MenuBar.Content>
        </MenuBar.Menu>
        <MenuBar.Menu>
          <MenuBar.Trigger>Profiles</MenuBar.Trigger>
          <MenuBar.Content>
            <MenuBar.RadioGroup value="benoit">
              <MenuBar.RadioItem value="andy">Andy</MenuBar.RadioItem>
              <MenuBar.RadioItem value="benoit">Benoit</MenuBar.RadioItem>
              <MenuBar.RadioItem value="Luis">Luis</MenuBar.RadioItem>
            </MenuBar.RadioGroup>
            <MenuBar.Separator />
            <MenuBar.Item inset>Edit...</MenuBar.Item>
            <MenuBar.Separator />
            <MenuBar.Item inset>Add Profile...</MenuBar.Item>
          </MenuBar.Content>
        </MenuBar.Menu>
      </>
    )
  }
};
