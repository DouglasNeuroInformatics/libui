import React from 'react';

import { Panel, type PanelProps } from 'react-resizable-panels';

import { ResizableHandle, type ResizableHandleProps } from './ResizableHandle.js';
import { ResizablePanelGroup, type ResizablePanelGroupProps } from './ResizablePanelGroup.js';

type ResizableRootType = React.FC<{ children: React.ReactNode }>;
type ResizableType = ResizableRootType & {
  Handle: React.FC<ResizableHandleProps>;
  Panel: React.FC<PanelProps>;
  PanelGroup: React.FC<ResizablePanelGroupProps>;
};

// This is only for storybook and is unnecessary for real-world use
const ResizableRoot: ResizableRootType = ({ children }) => <>{children}</>;

export const Resizable: ResizableType = Object.assign(ResizableRoot, {
  Handle: ResizableHandle,
  Panel,
  PanelGroup: ResizablePanelGroup
});
