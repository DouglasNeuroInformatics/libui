import React from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

/** @deprecated */
export type LegacyModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  showCloseButton?: boolean;
  title: string;
  width?: 'lg' | 'md' | 'sm' | 'xl';
};

/** @deprecated */
export const LegacyModal = ({ children, onClose, open, showCloseButton, title, width = 'md' }: LegacyModalProps) => {
  return (
    <Transition appear as={React.Fragment} show={open}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'relative w-full transform overflow-visible rounded-2xl bg-slate-100 p-6 text-left align-middle text-slate-900 shadow-xl transition-all dark:bg-slate-800 dark:text-slate-100',
                  {
                    'max-w-lg': width === 'lg',
                    'max-w-md': width === 'md',
                    'max-w-sm': width === 'sm',
                    'max-w-xl': width === 'xl'
                  }
                )}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="p-0.5 text-xl font-bold leading-6">
                    {title}
                  </Dialog.Title>
                  {showCloseButton && (
                    <button
                      className="flex items-center justify-center rounded-md p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700"
                      type="button"
                      onClick={onClose}
                    >
                      <XMarkIcon height={24} width={24} />
                    </button>
                  )}
                </div>
                <div className="my-2 p-0.5">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
