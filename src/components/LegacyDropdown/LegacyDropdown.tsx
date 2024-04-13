import React from 'react';

import { Menu, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

import { Card } from '../Card/Card.js';
import { DropdownButton } from '../DropdownButton/DropdownButton.js';

type LegacyDropdownOptions = { [key: string]: string } | readonly string[];

type LegacyDropdownOptionKey<T> = T extends readonly string[]
  ? T[number]
  : T extends { [key: string]: string }
    ? Extract<keyof T, string>
    : never;

/** @deprecated */
export type LegacyDropdownProps<T extends LegacyDropdownOptions> = {
  className?: string;

  /** Callback function invoked when user clicks an option */
  onSelection: (option: LegacyDropdownOptionKey<T>) => void;

  /** Either a list of options for the dropdown, or an object with options mapped to custom labels  */
  options: T;

  /** The text content for the dropdown toggle */
  title: string;
};

/** @deprecated */
// eslint-disable-next-line react/function-component-definition
export function LegacyDropdown<const T extends LegacyDropdownOptions>({
  className,
  onSelection,
  options,
  title
}: LegacyDropdownProps<T>) {
  const optionKeys: readonly string[] = options instanceof Array ? options : Object.keys(options);
  return (
    <Menu as="div" className={twMerge('relative w-full whitespace-nowrap', className)}>
      <Menu.Button
        as={DropdownButton}
        className="h-full w-full"
        disabled={options.length === 0}
        style={{ width: '100%' }}
      >
        {title}
      </Menu.Button>
      <Transition
        as="div"
        className="absolute bottom-0 z-10 w-full"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items as={Card} className="absolute z-10 mt-2 flex w-fit min-w-full flex-col overflow-hidden rounded-md">
          {optionKeys.map((option) => (
            <Menu.Item key={option}>
              <button
                className="p-2 text-left text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                data-cy="dropdown-menu-option"
                style={{ minWidth: 100 }}
                onClick={() => {
                  onSelection(option as LegacyDropdownOptionKey<T>);
                }}
              >
                {Array.isArray(options) ? option : (options[option as keyof T] as string)}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
