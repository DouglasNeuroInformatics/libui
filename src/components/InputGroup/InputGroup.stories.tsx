import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from './InputGroup.tsx';

type Story = StoryObj<typeof InputGroup>;

export default {
  args: {
    children: (
      <>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </>
    )
  },
  component: InputGroup,
  tags: ['autodocs']
} as Meta<typeof InputGroup>;

export const Default: Story = {};
