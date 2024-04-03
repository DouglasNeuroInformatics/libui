import React from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

import type { LegacyTableColumn, LegacyTableEntry } from './LegacyTable';

/** @deprecated */
export type LegacyColumnDropdownOptions<T extends LegacyTableEntry> = {
  icon?: React.ComponentType<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
  label: string;
  onSelection: (column: LegacyTableColumn<T>) => void;
}[];

/** @deprecated */
export type LegacyTableColumnProps<T extends LegacyTableEntry> = {
  column: LegacyTableColumn<T>;
  dropdownOptions?: LegacyColumnDropdownOptions<T>;
};

/** @deprecated */
export const LegacyTableColumnHeader = <T extends LegacyTableEntry>({
  column,
  dropdownOptions
}: LegacyTableColumnProps<T>) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={clsx(
          'flex min-w-[10rem] flex-shrink-0 items-center justify-between px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200',
          { 'cursor-default': !dropdownOptions }
        )}
      >
        {column.label}
        {dropdownOptions && <ChevronDownIcon className="ml-3" height={16} width={16} />}
      </Menu.Button>
      {dropdownOptions && (
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-4 z-50 mt-2 w-32 origin-top-right overflow-hidden rounded-md bg-slate-50 shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700">
            {dropdownOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Menu.Item
                  as="button"
                  className="flex w-full items-center text-ellipsis whitespace-nowrap px-3 py-2 hover:backdrop-brightness-95 dark:hover:backdrop-brightness-150"
                  key={option.label}
                  type="button"
                  onClick={() => {
                    option.onSelection(column);
                  }}
                >
                  {Icon && <Icon className="mr-2" height={16} width={16} />}
                  {option.label}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};
