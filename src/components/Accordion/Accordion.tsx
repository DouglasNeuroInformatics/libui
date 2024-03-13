import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

export const Accordion = Object.assign(AccordionPrimitive.Root, {
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger
});
