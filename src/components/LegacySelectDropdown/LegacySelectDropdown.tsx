import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

import { type ButtonProps } from '../Button/Button.js';
import { Card } from '../Card/Card.js';
import { DropdownButton } from '../DropdownButton/DropdownButton.js';

/** @deprecated */
export type LegacySelectOption = {
  key: string;
  label: string;
};

/** @deprecated */
export type LegacySelectDropdownProps<T extends LegacySelectOption> = {
  checkPosition?: 'left' | 'right';
  className?: string;
  options: T[];
  selected: T[];
  setSelected: (selected: T[]) => void;
  title: string;
  /** The button variant to use for the dropdown toggle */
  variant?: ButtonProps['variant'];
};

/** @deprecated */
export const LegacySelectDropdown = <T extends LegacySelectOption>({
  checkPosition = 'right',
  className,
  options,
  selected,
  setSelected,
  title
}: LegacySelectDropdownProps<T>) => {
  // Here we specify the key prop of objects for comparison
  return (
    <Listbox
      multiple
      as="div"
      by="key"
      className={clsx('relative flex w-full', className)}
      value={selected}
      onChange={setSelected}
    >
      <Listbox.Button as={DropdownButton} className="h-full w-full">
        {title}
      </Listbox.Button>
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
        <Listbox.Options
          as={Card}
          className="absolute z-10 mt-2 flex max-h-80 min-w-full flex-col overflow-scroll rounded-md scrollbar-none"
        >
          {options.map((option) => (
            <Listbox.Option
              className="flex w-full items-center whitespace-nowrap bg-slate-50 p-2 text-sm hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 "
              data-cy="select-dropdown-option"
              key={option.key}
              value={option}
            >
              {checkPosition === 'left' && (
                <CheckIcon className="invisible mr-2 h-6 ui-selected:visible" height={16} width={16} />
              )}
              <span className="ui-selected:font-medium" data-cy="select-dropdown-option-label">
                {option.label}
              </span>
              {checkPosition === 'right' && (
                <CheckIcon className="invisible ml-2 ui-selected:visible" height={16} width={16} />
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
