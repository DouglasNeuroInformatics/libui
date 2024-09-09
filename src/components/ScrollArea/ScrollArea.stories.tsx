import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from './ScrollArea';

type Story = StoryObj<typeof ScrollArea>;

export default { component: ScrollArea, tags: ['autodocs'] } as Meta<typeof ScrollArea>;

export const Default: Story = {
  args: {
    children: (
      <p>
        Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under
        the king&apos;s pillow, in his soup, even in the royal toilet. The king was furious, but he could not seem to
        stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so
        funny that they could not help but laugh. And once they started laughing, they could not stop.
      </p>
    ),
    className: 'h-[200px] w-[350px] rounded-md border p-4'
  }
};
