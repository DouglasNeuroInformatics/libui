import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComboBox } from './ComboBox.tsx';

type Story = StoryObj<typeof ComboBox>;

const frameworks: string[] = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export default {
  args: {
    children: (
      <ComboBox items={frameworks}>
        <ComboBox.Input placeholder="Select a framework" />
        <ComboBox.Content>
          <ComboBox.Empty>No items found.</ComboBox.Empty>
          <ComboBox.List>
            {(item: string) => (
              <ComboBox.Item key={item} value={item}>
                {item}
              </ComboBox.Item>
            )}
          </ComboBox.List>
        </ComboBox.Content>
      </ComboBox>
    )
  },
  component: ComboBox,
  tags: ['autodocs']
} as Meta<typeof ComboBox>;

export const Default: Story = {};
