import {
  createTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/table-core';
import type { GlobalFilter, TableOptionsResolved, TableState, Updater } from '@tanstack/table-core';
import { createStore } from 'zustand';

import { ROW_ACTIONS_METADATA_KEY, TABLE_NAME_METADATA_KEY } from './constants.ts';
import {
  applyUpdater,
  calculateColumnSizing,
  defineMemoizedHandle,
  getColumnPinningWithActions,
  getColumnsWithActions,
  getTanstackTableState
} from './utils.tsx';

import type { DataTableStore, DataTableStoreParams } from './types.ts';

export function createDataTableStore<T>(params: DataTableStoreParams<T>) {
  return createStore<DataTableStore>((set, get) => {
    const _state = getTanstackTableState(params);

    const invalidateHandles = <TKey extends keyof DataTableStore['$handles']>(keys: TKey[] | void) => {
      set((state) => {
        (keys ?? (Object.keys(state.$handles) as TKey[])).forEach((key) => {
          state.$handles[key].invalidate();
        });
        return { _key: Symbol() };
      });
    };

    const setTableState = <TKey extends keyof TableState>(key: TKey, updaterOrValue: Updater<TableState[TKey]>) => {
      const state = table.getState();
      const value = applyUpdater(updaterOrValue, state[key]);
      table.setOptions((prev) => ({ ...prev, state: { ...prev.state, [key]: value } }));
    };

    const updateColumnSizing = () => {
      const { _containerWidth } = get();
      if (!_containerWidth) {
        return;
      }
      setTableState('columnSizing', calculateColumnSizing(table, _containerWidth, params.columnBreakpoints));
    };

    const updateStyle = () => {
      set((state) => {
        const headers = table.getFlatHeaders();
        const style: React.CSSProperties & { [key: string]: any } = {
          width: table.getTotalSize()
        };
        if (state._containerWidth === null) {
          style['--table-container-width'] = state._containerWidth;
          style.visibility = 'hidden';
        } else {
          style['--table-container-width'] = state._containerWidth;
          style.visibility = 'visible';
        }
        for (const header of headers) {
          style[`--header-${header.id}-size`] = header.getSize();
          style[`--col-${header.column.id}-size`] = header.column.getSize();
        }
        return { style };
      });
    };

    // Mutable refs for server callbacks; updated by reset() as props change so handlers always call the latest version
    let _serverOnPaginationChange = params.mode === 'server' ? params.onPaginationChange : undefined;
    let _serverOnSortingChange = params.mode === 'server' ? params.onSortingChange : undefined;

    let modeOptions: Partial<TableOptionsResolved<any>>;
    if (params.mode === 'server') {
      modeOptions = {
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        pageCount: params.pageCount
      };
    } else {
      modeOptions = {
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
      };
    }

    const table = createTable<any>({
      ...modeOptions,
      columnResizeMode: 'onChange',
      columns: getColumnsWithActions(params),
      data: params.data,
      enableSortingRemoval: false,
      getCoreRowModel: getCoreRowModel(),
      meta: {
        ...params.meta,
        [ROW_ACTIONS_METADATA_KEY]: params.rowActions,
        [TABLE_NAME_METADATA_KEY]: params.tableName
      },
      onColumnFiltersChange: (updaterOrValue) => {
        setTableState('columnFilters', updaterOrValue);
        invalidateHandles();
      },
      onColumnPinningChange: (updaterOrValue) => {
        setTableState('columnPinning', updaterOrValue);
        invalidateHandles();
      },
      onColumnSizingChange: (updaterOrValue) => {
        const { _containerWidth: containerWidth } = get();
        const { columnSizing: prevColumnSizing } = table.getState();
        if (!containerWidth) {
          console.error('Cannot set column sizing: container width is null');
          return;
        }
        const updatedColumnSizing = applyUpdater(updaterOrValue, prevColumnSizing);
        const computedWidth = table.getVisibleLeafColumns().reduce((previous, current) => {
          return previous + (updatedColumnSizing[current.id] ?? current.getSize());
        }, 0);
        if (Number.isNaN(computedWidth)) {
          console.error('Failed to compute width for columns');
          return;
        }
        if (containerWidth > computedWidth) {
          return;
        }
        setTableState('columnSizing', updatedColumnSizing);
        updateStyle();
        invalidateHandles();
      },
      onColumnSizingInfoChange: (updaterOrValue) => {
        setTableState('columnSizingInfo', updaterOrValue);
        updateStyle();
        invalidateHandles();
      },
      onColumnVisibilityChange: (updaterOrValue) => {
        setTableState('columnVisibility', updaterOrValue);
        updateColumnSizing();
        updateStyle();
        invalidateHandles();
      },
      onGlobalFilterChange: (updaterOrValue: Updater<GlobalFilter>) => {
        setTableState('globalFilter', updaterOrValue);
        invalidateHandles();
      },
      onPaginationChange: (updaterOrValue) => {
        setTableState('pagination', updaterOrValue);
        _serverOnPaginationChange?.(table.getState().pagination);
        invalidateHandles();
      },
      onSortingChange: (updaterOrValue) => {
        setTableState('sorting', updaterOrValue);
        _serverOnSortingChange?.(table.getState().sorting);
        invalidateHandles();
      },
      onStateChange: (updaterOrValue) => {
        const prevState = table.getState();
        table.setOptions((prev) => ({
          ...prev,
          state: typeof updaterOrValue === 'function' ? updaterOrValue(prevState) : updaterOrValue
        }));
        invalidateHandles();
      },
      renderFallbackValue: null,
      state: _state
    });

    return {
      $handles: {
        headerGroups: defineMemoizedHandle(() => table.getHeaderGroups()),
        paginationInfo: defineMemoizedHandle(() => {
          const { pagination } = table.getState();
          return {
            pageCount: table.getPageCount(),
            pageIndex: pagination.pageIndex
          };
        }),
        rowCount: defineMemoizedHandle(() => table.getRowCount()),
        rows: defineMemoizedHandle(() => {
          const { rows } = table.getRowModel();
          return rows;
        }),
        table: defineMemoizedHandle(() => table),
        tableMeta: defineMemoizedHandle(() => table.options.meta ?? {})
      },
      _containerWidth: null,
      _key: Symbol(),
      reset: (updatedParams) => {
        const isServer = updatedParams.mode === 'server';
        if (updatedParams.mode === 'server') {
          _serverOnPaginationChange = updatedParams.onPaginationChange;
          _serverOnSortingChange = updatedParams.onSortingChange;
        }
        table.setOptions((options) => ({
          ...options,
          columns: getColumnsWithActions(updatedParams),
          data: updatedParams.data,
          meta: {
            ...updatedParams.meta,
            [ROW_ACTIONS_METADATA_KEY]: updatedParams.rowActions,
            [TABLE_NAME_METADATA_KEY]: updatedParams.tableName
          },
          ...(updatedParams.mode === 'server' && { pageCount: updatedParams.pageCount })
        }));

        // `initialState` is applied once, when the store is created. Everything in the live table
        // state -- pagination, sorting, column filters, the global filter, column sizing -- is owned
        // by the user, not by props, so rebuilding it here would send them back to page one (losing
        // their sort and search along with it) every time `data` or `columns` changed identity. The
        // only piece of state derived from props is the actions column's pinning, so reconcile just
        // that.
        setTableState('columnPinning', (columnPinning) =>
          getColumnPinningWithActions(columnPinning, updatedParams.rowActions)
        );

        // A props update can shrink the data out from under the current page (a consumer applying a
        // filter, say). Clamp to the last page that still exists rather than resetting to the first,
        // so the user keeps their place whenever it survives. Server mode owns its own pagination.
        if (!isServer) {
          const pageCount = table.getPageCount();
          const { pageIndex } = table.getState().pagination;
          if (pageCount > 0 && pageIndex > pageCount - 1) {
            table.setPageIndex(pageCount - 1);
          }
        }

        updateColumnSizing();
        updateStyle();
        invalidateHandles();
      },
      setContainerWidth: (containerWidth) => {
        set(() => {
          return { _containerWidth: containerWidth };
        });
        updateColumnSizing();
        updateStyle();
      },
      setGlobalFilter: (globalFilter) => {
        table.setGlobalFilter(globalFilter);
      },
      setPageIndex: (index) => {
        table.setPageIndex(index);
      },
      style: {
        visibility: 'hidden'
      }
    };
  });
}

export type DataTableStoreApi = ReturnType<typeof createDataTableStore>;
