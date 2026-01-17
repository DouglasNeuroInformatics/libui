import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { HoverCard } from './HoverCard';

type Story = StoryObj<typeof HoverCard>;

export default { component: HoverCard } as Meta<typeof HoverCard>;

export const Default: Story = {
  args: {
    children: (
      <>
        <HoverCard.Trigger asChild>
          <Button variant="link">View</Button>
        </HoverCard.Trigger>
        <HoverCard.Content className="w-80">
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut animi, incidunt corrupti officiis voluptatem,
            perspiciatis reiciendis quo nesciunt doloremque, recusandae pariatur nobis ratione! Accusamus ipsa
            repudiandae distinctio maiores enim temporibus.
          </p>
        </HoverCard.Content>
      </>
    )
  }
};
