import React from 'react';

import { Panel } from 'react-resizable-panels';

import { ResizableHandle } from './ResizableHandle';
import { ResizablePanelGroup } from './ResizablePanelGroup';

// This is only for storybook and is unnecessary for real-world use
const ResizableRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const Resizable = Object.assign(ResizableRoot, {
  Handle: ResizableHandle,
  Panel,
  PanelGroup: ResizablePanelGroup
});
