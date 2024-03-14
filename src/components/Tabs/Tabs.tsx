import * as TabsPrimitive from '@radix-ui/react-tabs';

import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

export const Tabs = Object.assign(TabsPrimitive.Root, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger
});
