import type { Meta, StoryObj } from '@storybook/react-vite';

import { Combobox } from './ComboBox.tsx';
import { ComboboxContent } from './ComboBoxContent.tsx';
import { ComboboxEmpty } from './ComboBoxEmpty.tsx';
import { ComboboxInput } from './ComboBoxInput.tsx';
import { ComboboxItem } from './ComboBoxItem.tsx';
import { ComboboxList } from './ComboBoxList.tsx';

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
