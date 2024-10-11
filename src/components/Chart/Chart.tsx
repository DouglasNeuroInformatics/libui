/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import * as React from 'react';

import { cn } from '@douglasneuroinformatics/libui/utils';
import * as RechartsPrimitive from 'recharts';

import { useChart } from '@/hooks/useChart';

import { ChartContainer } from './ChartContainer';
import { ChartStyle } from './ChartStyle';
import { ChartTooltipContent } from './ChartTooltipContent';

import type { ChartConfig } from './types';

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  {
    hideIcon?: boolean;
    nameKey?: string;
  } & Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> &
    React.ComponentProps<'div'>
>(({ className, hideIcon = false, nameKey, payload, verticalAlign = 'bottom' }, ref) => {
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
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            className={cn('flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground')}
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
ChartLegendContent.displayName = 'ChartLegend';

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export const Chart = Object.assign(ChartContainer, {
  Legend: ChartLegend,
  LegendContent: ChartLegendContent,
  Style: ChartStyle,
  Tooltip: ChartTooltip,
  TooltipContent: ChartTooltipContent
});
