import React, { createContext } from 'react';

/** @deprecated */
export const LegacyStepperContext = createContext<{
  index: number;
  updateIndex: React.Dispatch<'decrement' | 'increment'>;
}>(null!);
