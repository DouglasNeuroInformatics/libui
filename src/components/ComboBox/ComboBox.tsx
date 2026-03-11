import * as React from 'react';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

const Combobox = ComboboxPrimitive.Root;

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export { Combobox, useComboboxAnchor };
