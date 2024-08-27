import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { fileDropzone } from './fileDropzone.js';

type Story = StoryObj<typeof fileDropzone>;

export default { component: fileDropzone, tags: ['autodocs'] } as Meta<typeof fileDropzone>;

export const Default: Story = {};
