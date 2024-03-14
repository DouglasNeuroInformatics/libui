import * as PopoverPrimitive from '@radix-ui/react-popover';

import { PopoverContent } from './PopoverContent';

export const Popover = Object.assign(PopoverPrimitive.Root, {
  Anchor: PopoverPrimitive.Anchor,
  Content: PopoverContent,
  Trigger: PopoverPrimitive.Trigger
});
