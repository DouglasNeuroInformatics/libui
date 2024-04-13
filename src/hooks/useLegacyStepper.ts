import { useContext } from 'react';

import { LegacyStepperContext } from '../context/LegacyStepperContext.js';

/** @deprecated */
export function useLegacyStepper() {
  return useContext(LegacyStepperContext);
}
