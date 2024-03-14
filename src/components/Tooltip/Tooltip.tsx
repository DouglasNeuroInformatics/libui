import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { TooltipContent } from './TooltipContent';

export const Tooltip = Object.assign(TooltipPrimitive.Root, {
  Content: TooltipContent,
  Provider: TooltipPrimitive.Provider,
  Trigger: TooltipPrimitive.Trigger
});
