import { useDataTableHandle } from './hooks.ts';
import { flexRender } from './utils.tsx';

export const DataTableHead = () => {
  const headerGroups = useDataTableHandle('headerGroups');
  const rowCount = useDataTableHandle('rowCount');

  return (
    <div className="flex flex-col" data-testid="data-table-head" style={{ display: rowCount ? 'flex' : 'none' }}>
      {headerGroups.map((headerGroup) => (
        <div className="flex" key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const style: React.CSSProperties = {
              // TODO - add more robust solution - should be able to block centering also - also set correct typing
              justifyContent: header.column.columnDef.meta?.centered ? 'center' : 'start',
              width: `calc(var(--header-${header?.id}-size) * 1px)`
            };
            if (header.column.getIsPinned() === 'left') {
              style.left = `${header.column.getStart('left')}px`;
              style.position = 'sticky';
              style.zIndex = 20;
            } else if (header.column.getIsPinned() === 'right') {
              style.right = `${header.column.getAfter('right')}px`;
              style.position = 'sticky';
              style.zIndex = 20;
            }
            // no border with actions on right
            // TODO - consider resizing toggle in this case
            if (header.column.getIsLastColumn('center')) {
              style.borderRight = 'none';
            }
            return (
              <div
                className="group/cell bg-background relative flex items-center border-r border-b px-4 py-2 last:border-r-0"
                key={header.id}
                style={style}
              >
                {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanResize() && (
                  <div className="absolute top-0 right-0 z-10 h-full w-[1px]">
                    <button
                      className="group-hover/cell:bg-border absolute -right-[1px] h-full w-full cursor-col-resize touch-none rounded-md bg-transparent select-none group-hover/cell:-right-[2px] group-hover/cell:w-[3px]"
                      style={{ transform: header.column.getIsLastColumn() ? 'translateX(-2px)' : undefined }}
                      type="button"
                      onDoubleClick={header.column.resetSize}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
