import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionRoot } from './AccordionRoot';
import { AccordionTrigger } from './AccordionTrigger';

export const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger
});
