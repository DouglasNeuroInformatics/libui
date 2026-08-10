import * as React from 'react';

import { ComboboxChip, ComboboxChips, ComboboxChipsInput } from './ComboBoxChips.tsx';
import { ComboboxClear } from './ComboBoxClear.tsx';
import { ComboboxCollection } from './ComboBoxCollection.tsx';
import { ComboboxContent } from './ComboBoxContent.tsx';
import { ComboboxEmpty } from './ComboBoxEmpty.tsx';
import { ComboboxGroup } from './ComboBoxGroup.tsx';
import { ComboboxInput } from './ComboBoxInput.tsx';
import { ComboboxItem } from './ComboBoxItem.tsx';
import { ComboboxLabel } from './ComboBoxLabel.tsx';
import { ComboboxList } from './ComboBoxList.tsx';
import { ComboboxRoot } from './ComboBoxRoot.tsx';
import { ComboboxSeparator } from './ComboBoxSeparator.tsx';
import { ComboboxTrigger } from './ComboBoxTrigger.tsx';
import { ComboboxValue } from './ComboBoxValue.tsx';

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export { useComboboxAnchor };

export const ComboBox = Object.assign(ComboboxRoot, {
  Chip: ComboboxChip,
  Chips: ComboboxChips,
  ChipsInput: ComboboxChipsInput,
  Clear: ComboboxClear,
  Collection: ComboboxCollection,
  Content: ComboboxContent,
  Empty: ComboboxEmpty,
  Group: ComboboxGroup,
  Input: ComboboxInput,
  Item: ComboboxItem,
  Label: ComboboxLabel,
  List: ComboboxList,
  Separator: ComboboxSeparator,
  Trigger: ComboboxTrigger,
  Value: ComboboxValue
});
