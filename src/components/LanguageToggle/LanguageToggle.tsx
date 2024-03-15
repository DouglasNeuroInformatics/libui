import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';

export type LanguageToggleProps = {
  align?: 'center' | 'end' | 'start';
};

export const LanguageToggle = ({ align }: LanguageToggleProps = { align: 'start' }) => {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button size="icon" variant="outline">
          <LanguagesIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align={align}>
        <DropdownMenu.Item onClick={() => i18n.changeLanguage('en')}>English</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => i18n.changeLanguage('fr')}>Français</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
