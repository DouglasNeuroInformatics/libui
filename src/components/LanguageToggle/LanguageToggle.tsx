import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';

export type LanguageToggleProps = {
  align?: 'center' | 'end' | 'start';
  options: {
    [key: string]: string;
  };
};

export const LanguageToggle = ({ align, options }: LanguageToggleProps = { align: 'start', options: {} }) => {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button size="icon" variant="outline">
          <LanguagesIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align={align}>
        {Object.keys(options).map((option) => (
          <DropdownMenu.Item key={option} onClick={() => i18n.changeLanguage(option)}>
            {options[option]}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
