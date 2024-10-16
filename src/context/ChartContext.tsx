import { createContext } from 'react';

import type { ChartConfig } from '@/components';

type ChartContextProps = {
  config: ChartConfig;
};

export const ChartContext = createContext<ChartContextProps | null>(null);
