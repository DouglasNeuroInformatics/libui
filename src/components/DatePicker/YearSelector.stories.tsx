import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { YearSelector } from './YearSelector';

type Story = StoryObj<typeof YearSelector>;

export default { component: YearSelector } as Meta<typeof YearSelector>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [selected, setSelected] = useState(new Date());
      return <Story args={{ onSelection: setSelected, selected }} />;
    }
  ]
};
