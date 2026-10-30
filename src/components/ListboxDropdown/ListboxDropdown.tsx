import * as React from 'react';

import { cn } from '#utils';

import { DropdownButton } from '../DropdownButton/DropdownButton.tsx';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.tsx';

import type { ButtonProps } from '../Button/Button.tsx';

export type ListboxDropdownOption = {
  key: string;
  label: string;
};

export type ListboxDropdownProps<T extends ListboxDropdownOption> = {
  checkPosition?: 'left' | 'right';
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  options: T[];
  selected: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  title: string;
  triggerClassName?: string;
  variant?: ButtonProps['variant'];
  widthFull?: boolean;
};

export const ListboxDropdown = <T extends ListboxDropdownOption>({
  contentClassName,
  disabled,
  options,
  selected,
  setSelected,
  title,
  triggerClassName,
  widthFull
}: ListboxDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild className={cn('w-full', triggerClassName)} disabled={disabled}>
        <DropdownButton>{title}</DropdownButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" className={contentClassName} widthFull={widthFull}>
        {options.map((option) => {
          const checked = Boolean(selected.find((selectedOption) => selectedOption.key === option.key));
          return (
            <DropdownMenu.CheckboxItem
              checked={checked}
              className="flex w-full items-center bg-slate-50 p-2 text-sm whitespace-nowrap hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              data-testid="select-dropdown-option"
              key={option.key}
              onSelect={(event) => {
                event.preventDefault();
                if (checked) {
                  setSelected((prevSelected) => {
                    return prevSelected.filter((selectedOption) => selectedOption.key !== option.key);
                  });
                } else {
                  setSelected((prevSelected) => [...prevSelected, option]);
                }
              }}
            >
              {option.label}
            </DropdownMenu.CheckboxItem>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
