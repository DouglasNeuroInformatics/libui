import { Legend, Tooltip } from 'recharts';

import { ChartContainer } from './ChartContainer';
import { ChartLegendContent } from './ChartLegendContent';
import { ChartStyle } from './ChartStyle';
import { ChartTooltipContent } from './ChartTooltipContent';

export const Chart = Object.assign(ChartContainer, {
  Legend,
  LegendContent: ChartLegendContent,
  Style: ChartStyle,
  Tooltip,
  TooltipContent: ChartTooltipContent
});
