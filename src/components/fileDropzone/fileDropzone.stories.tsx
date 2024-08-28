import { useState } from 'react';
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { fileDropzone } from './fileDropzone.js';

const meta: Meta<typeof fileDropzone> = {
  component: fileDropzone
};

export default meta;

type Story = StoryObj<typeof fileDropzone>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [file, setFile] = useState<File | undefined>();
      return (
        <Story
          args={{
            file,
            setFile
          }}
        />
      );
    }
  ]
};
