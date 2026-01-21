import { TooltipContent } from './TooltipContent.tsx';
import { TooltipRoot } from './TooltipRoot.tsx';
import { TooltipTrigger } from './TooltipTrigger.tsx';

export const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Trigger: TooltipTrigger
});
