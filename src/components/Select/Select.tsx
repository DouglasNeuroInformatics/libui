import * as SelectPrimitive from '@radix-ui/react-select';

import { SelectContent } from './SelectContent.js';
import { SelectItem } from './SelectItem.js';
import { SelectLabel } from './SelectLabel.js';
import { SelectScrollDownButton } from './SelectScrollDownButton.js';
import { SelectScrollUpButton } from './SelectScrollUpButton.js';
import { SelectSeparator } from './SelectSeparator.js';
import { SelectTrigger } from './SelectTrigger.js';

export const Select = Object.assign(SelectPrimitive.Root.bind(null), {
  Content: SelectContent,
  Group: SelectPrimitive.Group,
  Item: SelectItem,
  Label: SelectLabel,
  ScrollDownButton: SelectScrollDownButton,
  ScrollUpButton: SelectScrollUpButton,
  Separator: SelectSeparator,
  Trigger: SelectTrigger,
  Value: SelectPrimitive.Value
});
