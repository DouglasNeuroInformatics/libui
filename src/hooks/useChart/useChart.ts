import { useContext } from 'react';

import { ChartContext } from '@/context/ChartContext';

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }
  return context;
}
