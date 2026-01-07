import type { CellContext, RowData } from '@tanstack/table-core';
import { MoreHorizontalIcon } from 'lucide-react';

import { useDestructiveAction, useTranslation } from '@/hooks';
import { cn } from '@/utils';

import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';
import { ROW_ACTIONS_METADATA_KEY, TABLE_NAME_METADATA_KEY } from './constants';

export const DataTableRowActionCell = <T extends RowData>({ row, table }: CellContext<T, unknown>) => {
  const destructiveAction = useDestructiveAction();
  const rowActions = table.options.meta?.[ROW_ACTIONS_METADATA_KEY];
  const tableName = table.options.meta?.[TABLE_NAME_METADATA_KEY];

  const { t } = useTranslation();

  if (!rowActions) {
    console.error('Expected rowActions to be defined in table metadata');
    return null;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button
            className="-m-1.5"
            data-table-name={table.options.meta?.name}
            data-testid="row-actions-trigger"
            size="icon"
            variant="ghost"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" data-table-name={tableName} data-testid="row-actions-dropdown">
          <DropdownMenu.Label>
            {t({
              en: 'Actions',
              fr: 'Actions'
            })}
          </DropdownMenu.Label>
          {rowActions.map(({ destructive, disabled, label, onSelect }, i) => (
            <DropdownMenu.Item
              className={cn(
                'cursor-pointer data-[disabled]:pointer-events-auto data-[disabled]:cursor-not-allowed',
                destructive && 'text-destructive'
              )}
              disabled={typeof disabled === 'function' ? disabled(row.original) : disabled}
              key={i}
              onSelect={() => {
                if (destructive) {
                  destructiveAction(() => void onSelect(row.original, table));
                } else {
                  void onSelect(row.original, table);
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
