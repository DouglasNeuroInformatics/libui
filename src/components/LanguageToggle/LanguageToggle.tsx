import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, type ButtonProps } from '../Button';
import { DropdownMenu } from '../DropdownMenu';

export type LanguageToggleProps = {
  align?: 'center' | 'end' | 'start';
  options: {
    [key: string]: string;
  };
  variant?: ButtonProps['variant'];
};

export const LanguageToggle = ({ align = 'start', options = {}, variant = 'outline' }: LanguageToggleProps) => {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button size="icon" variant={variant}>
          <LanguagesIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align={align}>
        {Object.keys(options).map((option) => (
          <DropdownMenu.Item key={option} onClick={() => void i18n.changeLanguage(option)}>
            {options[option]}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
