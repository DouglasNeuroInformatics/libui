import { TabsContent } from './TabsContent.tsx';
import { TabsList } from './TabsList.tsx';
import { TabsRoot } from './TabsRoot.tsx';
import { TabsTrigger } from './TabsTrigger.tsx';

export const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger
});
