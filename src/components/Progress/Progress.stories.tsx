import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './Progress';

type Story = StoryObj<typeof Progress>;

export default { component: Progress } as Meta<typeof Progress>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [progress, setProgress] = useState(13);

      useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
      }, []);

      return <Story args={{ className: 'w-[60%]', value: progress }} />;
    }
  ]
};
