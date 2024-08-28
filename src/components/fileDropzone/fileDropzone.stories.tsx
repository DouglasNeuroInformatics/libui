import type { Meta, StoryObj } from '@storybook/react';

import { fileDropzone } from './fileDropzone.js';

const meta: Meta<typeof fileDropzone> = {
  component: fileDropzone
};

export default meta;

type Story = StoryObj<typeof fileDropzone>;

export const Default: Story = {};
