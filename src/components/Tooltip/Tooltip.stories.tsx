import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

type Story = StoryObj<typeof Tooltip>;

export default { component: Tooltip } as Meta<typeof Tooltip>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <Tooltip.Provider>
        <Story
          args={{
            children: (
              <>
                <Tooltip.Trigger asChild>
                  <Button variant="outline">Hover</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>Add to library</p>
                </Tooltip.Content>
              </>
            )
          }}
        />
      </Tooltip.Provider>
    )
  ]
};
