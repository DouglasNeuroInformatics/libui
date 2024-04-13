import { AccordionContent } from './AccordionContent.js';
import { AccordionItem } from './AccordionItem.js';
import { AccordionRoot } from './AccordionRoot.js';
import { AccordionTrigger } from './AccordionTrigger.js';

export const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger
});
