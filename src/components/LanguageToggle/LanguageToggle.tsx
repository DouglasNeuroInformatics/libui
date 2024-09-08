import { LanguagesIcon } from 'lucide-react';

import { useTranslation } from '../../hooks';
import { Button, type ButtonProps } from '../Button';
import { DropdownMenu } from '../DropdownMenu';

import type { I18N } from '../../i18n';

export type LanguageToggleProps = {
  align?: 'center' | 'end' | 'start';
  contentClassName?: string;
  itemClassName?: string;
  options: {
    [L in I18N.Language]?: string;
  };
  triggerClassName?: string;
  variant?: ButtonProps['variant'];
};

export const LanguageToggle = ({
  align = 'start',
  contentClassName,
  itemClassName,
  options = {},
  triggerClassName,
  variant = 'outline'
}: LanguageToggleProps) => {
  const { changeLanguage } = useTranslation('libui');
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button className={triggerClassName} size="icon" variant={variant}>
          <LanguagesIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align={align} className={contentClassName}>
        {Object.keys(options).map((option) => (
          <DropdownMenu.Item
            className={itemClassName}
            key={option}
            onClick={() => void changeLanguage(option as I18N.Language)}
          >
            {options[option as I18N.Language]}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
