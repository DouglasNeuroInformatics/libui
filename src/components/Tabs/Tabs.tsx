import * as TabsPrimitive from '@radix-ui/react-tabs';

import { TabsContent } from './TabsContent.js';
import { TabsList } from './TabsList.js';
import { TabsTrigger } from './TabsTrigger.js';

export const Tabs = Object.assign(TabsPrimitive.Root, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger
});
