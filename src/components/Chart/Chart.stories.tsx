import type { Meta, StoryObj } from '@storybook/react';
import { Bar, BarChart, CartesianGrid } from 'recharts';

import { Chart, type ChartConfig } from './Chart';

const chartData = [
  { desktop: 186, mobile: 80, month: 'January' },
  { desktop: 305, mobile: 200, month: 'February' },
  { desktop: 237, mobile: 120, month: 'March' },
  { desktop: 73, mobile: 190, month: 'April' },
  { desktop: 209, mobile: 130, month: 'May' },
  { desktop: 214, mobile: 140, month: 'June' }
];

const chartConfig = {
  desktop: {
    color: '#2563eb',
    label: 'Desktop'
  },
  mobile: {
    color: '#60a5fa',
    label: 'Mobile'
  }
} satisfies ChartConfig;

type Story = StoryObj<typeof Chart>;

export default {
  component: Chart
} as Meta<typeof Chart>;

export const Default: Story = {
  args: {
    children: (
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    ),
    className: 'min-h-[200px] w-full',
    config: chartConfig
  }
};
