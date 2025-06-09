import type { Meta, StoryObj } from '@storybook/react-vite';

import { useTranslation } from '@/hooks';

import { Separator } from '../Separator';
import { LanguageToggle } from './LanguageToggle';

type Story = StoryObj<typeof LanguageToggle>;

export default { component: LanguageToggle, tags: ['autodocs'] } as Meta<typeof LanguageToggle>;

export const Default: Story = {
  args: {
    align: 'start',
    options: {
      en: 'English',
      fr: 'Français'
    }
  },
  decorators: [
    (Story) => {
      const i18n = useTranslation();
      return (
        <div className="flex items-center gap-6">
          <Story />
          <Separator className="h-6" orientation="vertical" />
          <h3 className="font-medium">
            {i18n.t({
              en: 'Hello',
              fr: 'Bonjour'
            })}
          </h3>
        </div>
      );
    }
  ]
};
