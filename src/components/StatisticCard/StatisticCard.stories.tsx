import type { Meta, StoryObj } from '@storybook/react';
import { UsersRoundIcon } from 'lucide-react';

import { StatisticCard } from './StatisticCard';

type Story = StoryObj<typeof StatisticCard>;

export default { component: StatisticCard } as Meta<typeof StatisticCard>;

export const Default: Story = {
  args: {
    icon: <UsersRoundIcon style={{ height: 48, width: 48 }} />,
    label: 'Total Users',
    value: 100
  }
};
