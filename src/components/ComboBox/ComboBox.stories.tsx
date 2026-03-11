import type { Meta, StoryObj } from '@storybook/react-vite';

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from './ComboBox.tsx';

type Story = StoryObj<typeof Combobox>;

const frameworks: string[] = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export default {
  args: {
    children: (
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
  component: Combobox,
  tags: ['autodocs']
} as Meta<typeof Combobox>;

export const Default: Story = {};
