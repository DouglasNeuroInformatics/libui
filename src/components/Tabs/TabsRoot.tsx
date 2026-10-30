import type { ComponentProps } from 'react';

import { Root } from '@radix-ui/react-tabs';

export const TabsRoot = ({ ref, ...props }: ComponentProps<typeof Root>) => {
  return <Root ref={ref} {...props} />;
};
