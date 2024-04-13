import { TabsContent } from './TabsContent.js';
import { TabsList } from './TabsList.js';
import { TabsRoot } from './TabsRoot.js';
import { TabsTrigger } from './TabsTrigger.js';

export const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger
});
