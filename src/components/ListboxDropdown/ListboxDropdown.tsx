import React from 'react';

import { type ButtonProps } from '../Button/Button.js';
import { DropdownButton } from '../DropdownButton/DropdownButton.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';

export type ListboxDropdownOption = {
  key: string;
  label: string;
};

export type ListboxDropdownProps<T extends ListboxDropdownOption> = {
  checkPosition?: 'left' | 'right';
  className?: string;
  options: T[];
  selected: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  title: string;
  /** The button variant to use for the dropdown toggle */
  variant?: ButtonProps['variant'];
};

export const ListboxDropdown = <T extends ListboxDropdownOption>({
  options,
  selected,
  setSelected,
  title
}: ListboxDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild className="w-full">
        <DropdownButton>{title}</DropdownButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content widthFull align="start">
        {options.map((option) => {
          const checked = Boolean(selected.find((selectedOption) => selectedOption.key === option.key));
          return (
            <DropdownMenu.CheckboxItem
              checked={checked}
              className="flex w-full items-center whitespace-nowrap bg-slate-50 p-2 text-sm hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 "
              data-cy="select-dropdown-option"
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
