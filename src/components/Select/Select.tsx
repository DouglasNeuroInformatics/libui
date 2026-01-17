import * as SelectPrimitive from '@radix-ui/react-select';

import { SelectContent } from './SelectContent.tsx';
import { SelectItem } from './SelectItem.tsx';
import { SelectLabel } from './SelectLabel.tsx';
import { SelectScrollDownButton } from './SelectScrollDownButton.tsx';
import { SelectScrollUpButton } from './SelectScrollUpButton.tsx';
import { SelectSeparator } from './SelectSeparator.tsx';
import { SelectTrigger } from './SelectTrigger.tsx';

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
