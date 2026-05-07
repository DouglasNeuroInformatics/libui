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
  getColumnsWithActions,
  getTanstackTableState
} from './utils.tsx';

import type { AnyDataTableStoreParams, DataTableStore } from './types.ts';

export function createDataTableStore<T>(params: AnyDataTableStoreParams<T>) {
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
        if (params.mode === 'server') {
          params.onPaginationChange(table.getState().pagination);
        }
        invalidateHandles();
      },
      onSortingChange: (updaterOrValue) => {
        setTableState('sorting', updaterOrValue);
        if (params.mode === 'server') {
          params.onSortingChange?.(table.getState().sorting);
        }
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
        table.setOptions((options) => ({
          ...options,
          columns: getColumnsWithActions(updatedParams),
          data: params.data,
          meta: {
            ...params.meta,
            [ROW_ACTIONS_METADATA_KEY]: updatedParams.rowActions,
            [TABLE_NAME_METADATA_KEY]: updatedParams.tableName
          },
          state: getTanstackTableState(updatedParams)
        }));
        invalidateHandles();

        // if (isServer) {
        //   const sp = newParams as DataTableServerStoreParams<any>;
        //   _serverOnPaginationChange = sp.onPaginationChange;
        //   _serverOnSortingChange = sp.onSortingChange;
        //   table.setOptions((options) => ({
        //     ...options,
        //     columns: getColumnsWithActions(newParams),
        //     data: newParams.data,
        //     meta: {
        //       ...newParams.meta,
        //       [ROW_ACTIONS_METADATA_KEY]: newParams.rowActions,
        //       [TABLE_NAME_METADATA_KEY]: newParams.tableName
        //     },
        //     pageCount: sp.pageCount
        //   }));
        // } else {
        //   table.setOptions((options) => ({
        //     ...options,
        //     columns: getColumnsWithActions(newParams),
        //     data: newParams.data,
        //     meta: {
        //       ...newParams.meta,
        //       [ROW_ACTIONS_METADATA_KEY]: newParams.rowActions,
        //       [TABLE_NAME_METADATA_KEY]: newParams.tableName
        //     },
        //     state: getTanstackTableState(newParams)
        //   }));
        // }
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
