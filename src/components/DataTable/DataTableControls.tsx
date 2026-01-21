import React, { useEffect, useState } from 'react';

import type { RowData, Table } from '@tanstack/table-core';

import { useTranslation } from '#hooks';

import { SearchBar } from '../SearchBar/SearchBar.tsx';
import { useDataTableHandle, useDataTableStore } from './hooks.ts';

import type { SearchChangeHandler } from './types.ts';

export const DataTableControls = <T extends RowData>({
  onSearchChange,
  togglesComponent: Toggles
}: {
  onSearchChange?: SearchChangeHandler<T>;
  togglesComponent?: React.FC<{ table: Table<T> }>;
}) => {
  const table = useDataTableHandle('table');
  const setGlobalFilter = useDataTableStore((store) => store.setGlobalFilter);
  const [searchValue, setSearchValue] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    if (onSearchChange) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      onSearchChange(searchValue, table);
    } else {
      setGlobalFilter(searchValue || undefined);
    }
  }, [onSearchChange, searchValue]);

  return (
    <div className="flex flex-col items-center gap-4 pb-4 md:flex-row">
      <SearchBar
        className="w-full grow"
        data-testid="data-table-search-bar"
        placeholder={t({
          en: 'Search...',
          fr: 'Rechercher...'
        })}
        value={searchValue}
        onValueChange={(value) => {
          setSearchValue(value);
        }}
      />
      {Toggles && (
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Toggles table={table} />
        </div>
      )}
    </div>
  );
};
