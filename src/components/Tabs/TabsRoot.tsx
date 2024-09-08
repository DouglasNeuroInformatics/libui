import { forwardRef } from 'react';

import { Root } from '@radix-ui/react-tabs';

export const TabsRoot = forwardRef<React.ComponentRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  function TabsRoot(props, ref) {
    return <Root ref={ref} {...props} />;
  }
);
