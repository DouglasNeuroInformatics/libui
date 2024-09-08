import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Label/Label.js';
import { RadioGroup } from './RadioGroup.js';

type Story = StoryObj<typeof RadioGroup>;

export default { component: RadioGroup, tags: ['autodocs'] } as Meta<typeof RadioGroup>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item id="r1" value="default" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item id="r2" value="comfortable" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroup.Item id="r3" value="compact" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </>
    ),
    defaultValue: 'default',
    onValueChange(value) {
      alert(value);
    }
  }
};
