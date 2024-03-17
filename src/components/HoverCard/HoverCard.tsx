import { Root, Trigger } from '@radix-ui/react-hover-card';

import { HoverCardContent } from './HoverCardContent';

export const HoverCard = Object.assign(Root, {
  Content: HoverCardContent,
  Trigger
});
