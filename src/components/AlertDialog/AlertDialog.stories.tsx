import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button.js';
import { AlertDialog } from './AlertDialog.js';

type Story = StoryObj<typeof AlertDialog>;

export default { component: AlertDialog } as Meta<typeof AlertDialog>;

export const Default: Story = {
  args: {
    children: (
      <React.Fragment>
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
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Continue</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </React.Fragment>
    )
  }
};
