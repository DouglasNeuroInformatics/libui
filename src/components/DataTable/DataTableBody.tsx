import { useTranslation } from '#hooks';

import { DataTableEmptyState } from './DataTableEmptyState.tsx';
import { useDataTableHandle } from './hooks.ts';
import { flexRender } from './utils.tsx';

import type { DataTableEmptyStateProps } from './DataTableEmptyState.tsx';

export const DataTableBody: React.FC<{ emptyStateProps?: Partial<DataTableEmptyStateProps> }> = ({
  emptyStateProps
}) => {
  const rows = useDataTableHandle('rows');
  const { t } = useTranslation();

  return (
    <div className="flex flex-col" data-testid="data-table-body">
      {rows.length === 0 ? (
        <div
          className="sticky left-0 flex h-72 items-center justify-center px-6 py-3"
          style={{
            width: 'calc(var(--table-container-width) * 1px)'
          }}
        >
          <DataTableEmptyState
            title={t({
              en: 'No Results',
              fr: 'Aucun résultat'
            })}
            {...emptyStateProps}
          />
        </div>
      ) : (
        rows.map((row) => (
          <div className="flex border-b last:border-b-0" data-testid="data-table-row" id={row.id} key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const style: React.CSSProperties = {
                width: `calc(var(--col-${cell.column.id}-size) * 1px)`
              };
              if (cell.column.getIsPinned() === 'left') {
                style.left = `${cell.column.getStart('left')}px`;
                style.position = 'sticky';
                style.zIndex = 20;
              } else if (cell.column.getIsPinned() === 'right') {
                style.right = `${cell.column.getAfter('right')}px`;
                style.position = 'sticky';
                style.zIndex = 20;
              }
              // no border with actions on right
              // TODO - consider resizing toggle in this case
              if (cell.column.getIsLastColumn('center')) {
                style.borderRight = 'none';
              }
              const content = flexRender(cell.column.columnDef.cell, cell.getContext());
              return (
                <div
                  className="bg-background flex items-center border-r px-4 py-2 last:border-r-0"
                  key={cell.id}
                  style={style}
                >
                  {content && typeof content === 'object' ? content : <span className="block truncate">{content}</span>}
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};
