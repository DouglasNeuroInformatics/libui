import { Fragment } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { AlertDialog } from './AlertDialog';

type Story = StoryObj<typeof AlertDialog>;

export default { component: AlertDialog } as Meta<typeof AlertDialog>;

export const Default: Story = {
  args: {
    children: (
      <Fragment>
        <AlertDialog.Trigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Action>Continue</AlertDialog.Action>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </Fragment>
    )
  }
};
