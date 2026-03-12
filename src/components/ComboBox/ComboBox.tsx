import * as React from 'react';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ComboboxTrigger } from './ComboBoxTrigger.tsx';
import { ComboboxContent } from './ComboBoxContent.tsx';
import { ComboboxItem } from './ComboBoxItem.tsx';
import { ComboboxList } from './ComboBoxList.tsx';
import { ComboboxGroup } from './ComboBoxGroup.tsx';
import { ComboboxLabel } from './ComboBoxLabel.tsx';
import { ComboboxChip, ComboboxChips, ComboboxChipsInput } from './ComboBoxChips.tsx';
import { ComboboxClear } from './ComboBoxClear.tsx';
import { ComboboxCollection } from './ComboBoxCollection.tsx';
import { ComboboxEmpty } from './ComboBoxEmpty.tsx';
import { ComboboxInput } from './ComboBoxInput.tsx';
import { ComboboxSeparator } from './ComboBoxSeparator.tsx';
import { ComboboxValue } from './ComboBoxValue.tsx';

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export const ComboBox = Object.assign(ComboboxPrimitive.Root.bind(null), {
  Content: ComboboxContent,
  Anchor: useComboboxAnchor,
  Chip: ComboboxChip,
  Chips: ComboboxChips,
  ChipsInput: ComboboxChipsInput,
  Clear: ComboboxClear,
  Collection: ComboboxCollection,
  Empty: ComboboxEmpty,
  Group: ComboboxGroup,
  Input: ComboboxInput,
  Item: ComboboxItem,
  List: ComboboxList,
  Label: ComboboxLabel,
  Separator: ComboboxSeparator,
  Trigger: ComboboxTrigger,
  Value: ComboboxValue
});
