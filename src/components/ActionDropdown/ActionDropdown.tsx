import React from 'react';

import { DropdownButton } from '../DropdownButton/DropdownButton.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';

import type { DropdownMenuContentProps } from '../DropdownMenu/DropdownMenuContent.js';

type ActionDropdownOptions = { [key: string]: string } | readonly string[];

type ActionDropdownOptionKey<T> = T extends readonly string[]
  ? T[number]
  : T extends { [key: string]: string }
    ? Extract<keyof T, string>
    : never;

export type ActionDropdownProps<T extends ActionDropdownOptions> = {
  align?: DropdownMenuContentProps['align'];

  disabled?: boolean;

  /** Callback function invoked when user clicks an option */
  onSelection: (option: ActionDropdownOptionKey<T>) => void;

  /** Either a list of options for the dropdown, or an object with options mapped to custom labels  */
  options: T;

  /** The text content for the dropdown toggle */
  title: string;

  triggerClassName?: string;
};

// eslint-disable-next-line react/function-component-definition
export function ActionDropdown<const T extends ActionDropdownOptions>({
  align = 'start',
  disabled,
  onSelection,
  options,
  title,
  triggerClassName
}: ActionDropdownProps<T>) {
  const optionKeys: readonly string[] = options instanceof Array ? options : Object.keys(options);
  return (
    <DropdownMenu>
      <div className="w-full">
        <DropdownMenu.Trigger asChild>
          <DropdownButton className={triggerClassName} disabled={disabled}>
            {title}
          </DropdownButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align={align} style={{ width: 'var(--radix-popper-anchor-width)' }}>
          <DropdownMenu.Group>
            {optionKeys.map((option) => (
              <DropdownMenu.Item
                key={option}
                onClick={() => {
                  onSelection(option as ActionDropdownOptionKey<T>);
                }}
              >
                {Array.isArray(options) ? option : (options[option as keyof T] as string)}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </div>
    </DropdownMenu>
  );
}
