import { TooltipContent } from './TooltipContent';
import { TooltipRoot } from './TooltipRoot';
import { TooltipTrigger } from './TooltipTrigger';

export const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Trigger: TooltipTrigger
});
