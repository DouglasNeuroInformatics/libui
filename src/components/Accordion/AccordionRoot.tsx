import { forwardRef } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const AccordionRoot = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(function AccordionRoot(props, ref) {
  return <AccordionPrimitive.Root data-testid="accordion" ref={ref} {...props} />;
});
