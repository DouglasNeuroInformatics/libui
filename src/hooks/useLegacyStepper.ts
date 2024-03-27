import { useContext } from 'react';

import { LegacyStepperContext } from '@/context/LegacyStepperContext';

/** @deprecated */
export function useLegacyStepper() {
  return useContext(LegacyStepperContext);
}
