import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FileDropzone } from './FileDropzone.js';

type Story = StoryObj<typeof FileDropzone>;

export default {
  component: FileDropzone
} satisfies Meta<typeof FileDropzone>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [file, setFile] = useState<File | undefined>();
      return (
        <Story
          args={{
            acceptedFileTypes: {
              'text/csv': ['.csv'],
              'text/plain': ['.csv', '.tsv']
            },
            file,
            setFile
          }}
        />
      );
    }
  ]
};
