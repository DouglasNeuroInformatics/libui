import { TooltipContent } from './TooltipContent.js';
import { TooltipRoot } from './TooltipRoot.js';
import { TooltipTrigger } from './TooltipTrigger.js';

export const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Trigger: TooltipTrigger
});
