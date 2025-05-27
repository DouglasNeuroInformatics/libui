import type React from 'react';

import type { Row } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';
import type { Promisable } from 'type-fest';

import { useTranslation } from '@/hooks';

import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';

import type { DestructiveActionPending } from './DestructiveActionDialog';

export type RowAction<TData extends { [key: string]: unknown }> = {
  destructive?: boolean;
  label: string;
  onSelect: (row: TData) => Promisable<void>;
};

export const RowActionsDropdown = <TData extends { [key: string]: unknown }>({
  row,
  rowActions,
  setDestructiveActionPending
}: {
  row: Row<TData>;
  rowActions: RowAction<TData>[];
  setDestructiveActionPending: React.Dispatch<React.SetStateAction<DestructiveActionPending>>;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full justify-end">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button className="-m-1.5" size="icon" variant="ghost">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>
            {t({
              en: 'Actions',
              fr: 'Actions'
            })}
          </DropdownMenu.Label>
          {rowActions.map(({ destructive, label, onSelect }, i) => (
            <DropdownMenu.Item
              className={destructive ? 'text-destructive' : undefined}
              key={i}
              onSelect={() => {
                if (destructive) {
                  setDestructiveActionPending(() => () => void onSelect(row.original));
                } else {
                  void onSelect(row.original);
                }
              }}
            >
              {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
