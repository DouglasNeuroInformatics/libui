import * as SelectPrimitive from '@radix-ui/react-select';

import { SelectContent } from './SelectContent';
import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectScrollDownButton } from './SelectScrollDownButton';
import { SelectScrollUpButton } from './SelectScrollUpButton';
import { SelectSeparator } from './SelectSeparator';
import { SelectTrigger } from './SelectTrigger';

export const Select = Object.assign(SelectPrimitive.Root, {
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
