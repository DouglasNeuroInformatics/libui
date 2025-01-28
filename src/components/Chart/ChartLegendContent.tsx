import { forwardRef } from 'react';

import type { LegendProps } from 'recharts';

import { useChart } from '@/hooks/useChart';
import { cn } from '@/utils';

import { getPayloadConfigFromPayload } from './utils';

export const ChartLegendContent = forwardRef<
  HTMLDivElement,
  Pick<LegendProps, 'payload' | 'verticalAlign'> &
    React.ComponentProps<'div'> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(function ChartLegendContent({ className, hideIcon = false, nameKey, payload, verticalAlign = 'bottom' }, ref) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-4', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className)}
      ref={ref}
    >
      {payload.map((item) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const key = `${nameKey ?? item.dataKey ?? 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            className={cn('flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground')}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            key={item.value}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
