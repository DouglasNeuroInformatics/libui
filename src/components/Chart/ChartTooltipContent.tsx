import React, { forwardRef } from 'react';

import { Tooltip } from 'recharts';

import { useChart } from '@/hooks/useChart';
import { cn } from '@/utils';

import { getPayloadConfigFromPayload } from './utils';

export const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  {
    hideIndicator?: boolean;
    hideLabel?: boolean;
    indicator?: 'dashed' | 'dot' | 'line';
    labelKey?: string;
    nameKey?: string;
  } & React.ComponentProps<'div'> &
    React.ComponentProps<typeof Tooltip>
>(function ChartLegendContent(
  {
    active,
    className,
    color,
    formatter,
    hideIndicator = false,
    hideLabel = false,
    indicator = 'dot',
    label,
    labelClassName,
    labelFormatter,
    labelKey,
    nameKey,
    payload
  },
  ref
) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item!.dataKey ?? item!.name ?? 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === 'string' ? config[label]?.label || label : itemConfig?.label;

    if (labelFormatter) {
      return <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>;
    }

    if (!value) {
      return null;
    }

    return <div className={cn('font-medium', labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <div
      className={cn(
        'border-border/50 grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
      ref={ref}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const indicatorColor = color ?? item.payload.fill ?? item.color;

          return (
            <div
              className={cn(
                'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                indicator === 'dot' && 'items-center'
              )}
              key={item.dataKey}
            >
              {formatter && item?.value !== undefined && item.name ? (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn('shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]', {
                          'h-2.5 w-2.5': indicator === 'dot',
                          'my-0.5': nestLabel && indicator === 'dashed',
                          'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                          'w-1': indicator === 'line'
                        })}
                        style={
                          {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            '--color-bg': indicatorColor,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            '--color-border': indicatorColor
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn('flex flex-1 justify-between leading-none', nestLabel ? 'items-end' : 'items-center')}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                    </div>
                    {item.value && (
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
