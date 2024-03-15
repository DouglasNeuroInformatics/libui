import { Root as PopoverRoot } from '@radix-ui/react-popover';

import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';

export const Popover = Object.assign(PopoverRoot, {
  Content: PopoverContent,
  Trigger: PopoverTrigger
});
