import type { Meta, StoryObj } from '@storybook/react';

import { LanguageToggle } from './LanguageToggle.js';

type Story = StoryObj<typeof LanguageToggle>;

export default { component: LanguageToggle, tags: ['autodocs'] } as Meta<typeof LanguageToggle>;

export const Default: Story = {
  args: {
    align: 'start',
    options: {
      en: 'English',
      fr: 'Français'
    }
  }
};
