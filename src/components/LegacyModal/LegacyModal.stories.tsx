import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button.js';
import { LegacyModal } from './LegacyModal.js';

type Story = StoryObj<typeof LegacyModal>;

const meta: Meta<typeof LegacyModal> = {
  args: {
    onClose: () => {
      alert('Close!');
    },
    open: true,
    showCloseButton: false,
    title: 'Terms and Conditions'
  },
  component: LegacyModal
};

export default meta;

export const Default: Story = {
  args: {
    children: (
      <>
        <div>
          <p className="text-sm text-muted-foreground">Please indicate whether you accept our terms and conditions</p>
        </div>

        <div className="mt-4 flex">
          <Button className="mr-2" label="Accept" variant="primary" />
          <Button label="Decline" variant="secondary" />
        </div>
      </>
    )
  }
};
