import { forwardRef, useId } from 'react';

import { ResponsiveContainer } from 'recharts';

import { ChartContext } from '@/context/ChartContext';
import { cn } from '@/utils';

import { Chart } from './Chart';

import type { ChartConfig } from './types';

export const ChartContainer = forwardRef<
  HTMLDivElement,
  {
    children: React.ComponentProps<typeof ResponsiveContainer>['children'];
    config: ChartConfig;
  } & React.ComponentProps<'div'>
>(function ChartContainer({ children, className, config, id, ...props }, ref) {
  const uniqueId = useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        data-chart={chartId}
        ref={ref}
        {...props}
      >
        <Chart.Style config={config} id={chartId} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
