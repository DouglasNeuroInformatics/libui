import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FileDropzone } from './FileDropzone.js';

const meta: Meta<typeof FileDropzone> = {
  component: FileDropzone
};

export default meta;

type Story = StoryObj<typeof FileDropzone>;

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
