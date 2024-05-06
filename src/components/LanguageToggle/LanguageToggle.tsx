import React from 'react';

import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, type ButtonProps } from '../Button/Button.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';

export type LanguageToggleProps = {
  align?: 'center' | 'end' | 'start';
  contentClassName?: string;
  options: {
    [key: string]: string;
  };
  triggerClassName?: string;
  variant?: ButtonProps['variant'];
};

export const LanguageToggle = ({
  align = 'start',
  contentClassName,
  options = {},
  triggerClassName,
  variant = 'outline'
}: LanguageToggleProps) => {
  const { i18n } = useTranslation('libui');
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button className={triggerClassName} size="icon" variant={variant}>
          <LanguagesIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align={align} className={contentClassName}>
        {Object.keys(options).map((option) => (
          <DropdownMenu.Item key={option} onClick={() => void i18n.changeLanguage(option)}>
            {options[option]}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
