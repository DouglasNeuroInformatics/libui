import * as React from 'react';

import { Panel, type PanelProps } from 'react-resizable-panels';

import { ResizableHandle, type ResizableHandleProps } from './ResizableHandle';
import { ResizablePanelGroup, type ResizablePanelGroupProps } from './ResizablePanelGroup';

type ResizableRootType = React.FC<{ children: React.ReactNode }>;
type ResizableType = {
  Handle: React.FC<ResizableHandleProps>;
  Panel: React.FC<PanelProps>;
  PanelGroup: React.FC<ResizablePanelGroupProps>;
} & ResizableRootType;

// This is only for storybook and is unnecessary for real-world use
const ResizableRoot: ResizableRootType = ({ children }) => <>{children}</>;

export const Resizable: ResizableType = Object.assign(ResizableRoot, {
  Handle: ResizableHandle,
  Panel,
  PanelGroup: ResizablePanelGroup
});
