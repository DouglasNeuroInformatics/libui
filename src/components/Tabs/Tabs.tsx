import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import { TabsRoot } from './TabsRoot';
import { TabsTrigger } from './TabsTrigger';

export const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger
});
