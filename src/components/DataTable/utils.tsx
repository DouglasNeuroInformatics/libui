import type { ColumnDef, ColumnSizingState, RowData, Table, TableState, Updater } from '@tanstack/table-core';
import { sum } from 'lodash-es';

import { ACTIONS_COLUMN_ID, MEMOIZED_HANDLE_ID } from './constants';
import { DataTableRowActionCell } from './DataTableRowActionCell';

import type { DataTableStoreParams, MemoizedHandle } from './types';

function applyUpdater<T>(updater: Updater<T>, current: T): T {
  return typeof updater === 'function' ? (updater as (prev: T) => T)(current) : updater;
}

function calculateColumnSizing(table: Table<any>, containerWidth: number) {
  const updatedColumnSizing: ColumnSizingState = {};

  const visibleCenterLeafColumns = table.getCenterLeafColumns().filter((column) => column.getIsVisible());
  const visibleCenterLeafColumnIds = visibleCenterLeafColumns.map((column) => column.id);
  const visibleNonCenteredLeafColumns = table.getVisibleLeafColumns().filter((column) => {
    return !visibleCenterLeafColumnIds.includes(column.id);
  });

  visibleNonCenteredLeafColumns.forEach((column) => {
    const defaultSize = column.columnDef.size;
    if (!defaultSize) {
      console.error(`Size must be specified for pinned column with ID '${column.id}', defaulting to 200px`);
      updatedColumnSizing[column.id] = 200;
    } else {
      updatedColumnSizing[column.id] = defaultSize;
    }
  });

  const nonCenteredColumnsSize = sum(Object.values(updatedColumnSizing));
  const availableCenterSize = containerWidth - nonCenteredColumnsSize;
  let maxCenterColumns: number;
  if (containerWidth < 512) {
    maxCenterColumns = 1;
  } else if (containerWidth < 768) {
    maxCenterColumns = 2;
  } else if (containerWidth < 1024) {
    maxCenterColumns = 3;
  } else if (containerWidth < 1280) {
    maxCenterColumns = 4;
  } else {
    maxCenterColumns = 5;
  }

  const centerColumnsToDisplay = Math.min(visibleCenterLeafColumns.length, maxCenterColumns);
  if (centerColumnsToDisplay) {
    visibleCenterLeafColumns.forEach((column) => {
      updatedColumnSizing[column.id] = availableCenterSize / centerColumnsToDisplay;
    });
  } else {
    visibleNonCenteredLeafColumns.forEach((column) => {
      updatedColumnSizing[column.id] = containerWidth / visibleNonCenteredLeafColumns.length;
    });
  }

  return updatedColumnSizing;
}

function defineMemoizedHandle<T extends (...args: any[]) => any>(target: T) {
  const handle = target as MemoizedHandle<T>;
  handle[MEMOIZED_HANDLE_ID] = Symbol();
  handle.invalidate = function () {
    this[MEMOIZED_HANDLE_ID] = Symbol();
  };
  return handle;
}

function flexRender<TProps extends object>(
  Comp: React.ComponentType<TProps> | React.ReactNode,
  props: TProps
): React.JSX.Element | React.ReactNode {
  return !Comp ? null : isReactComponent<TProps>(Comp) ? <Comp {...props} /> : Comp;
}

function getColumnsWithActions<T extends RowData>({ columns, rowActions }: DataTableStoreParams<T>): ColumnDef<T>[] {
  if (!rowActions) {
    return columns;
  }
  return [
    ...columns,
    {
      cell: DataTableRowActionCell,
      enableHiding: false,
      enableResizing: false,
      id: ACTIONS_COLUMN_ID,
      size: 64
    }
  ];
}

function getTanstackTableState<T>({ initialState, rowActions }: DataTableStoreParams<T>): TableState {
  const { columnFilters = [], columnPinning = {}, sorting = [] } = initialState ?? {};
  const state: TableState = {
    columnFilters,
    columnOrder: [],
    columnPinning,
    columnSizing: {},
    columnSizingInfo: {
      columnSizingStart: [],
      deltaOffset: null,
      deltaPercentage: null,
      isResizingColumn: false,
      startOffset: null,
      startSize: null
    },
    columnVisibility: {},
    expanded: {},
    globalFilter: undefined,
    grouping: [],
    pagination: {
      pageIndex: 0,
      pageSize: 10
    },
    rowPinning: {},
    rowSelection: {},
    sorting
  };
  if (rowActions) {
    state.columnPinning.right ??= [];
    state.columnPinning.right.push(ACTIONS_COLUMN_ID);
  }
  return state;
}

function isReactComponent<TProps>(component: unknown): component is React.ComponentType<TProps> {
  return typeof component === 'function';
}

export {
  applyUpdater,
  calculateColumnSizing,
  defineMemoizedHandle,
  flexRender,
  getColumnsWithActions,
  getTanstackTableState
};
