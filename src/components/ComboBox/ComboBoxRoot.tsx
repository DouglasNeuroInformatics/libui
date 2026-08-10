import * as React from 'react';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

type ChangeEventDetails = ComboboxPrimitive.Root.ChangeEventDetails;

/**
 * Closing for one of these reasons discards whatever the user typed, so the text must not be
 * committed as a custom value: an item was selected, or the user explicitly reverted.
 */
const DISCARDED_CLOSE_REASONS: readonly string[] = ['escape-key', 'item-press'];

/** Mirrors how base UI derives the text shown in the input for a given item. */
const stringifyItem = <Value,>(item: null | undefined | Value, itemToStringLabel?: (itemValue: Value) => string) => {
  if (item === null || item === undefined) {
    return '';
  }
  if (itemToStringLabel) {
    return itemToStringLabel(item) ?? '';
  }
  if (typeof item === 'object') {
    const { label, value } = item as { label?: number | string; value?: number | string };
    if (label !== null && label !== undefined) {
      return String(label);
    }
    return value === null || value === undefined ? '' : String(value);
  }
  return String(item);
};

/** Finds the item whose label is the text the user typed, so exact matches select the real item. */
const findItemByLabel = <Value,>(
  items: readonly unknown[] | undefined,
  label: string,
  itemToStringLabel?: (itemValue: Value) => string
) => {
  if (!items) {
    return undefined;
  }
  const flatItems = items.flatMap((item) =>
    typeof item === 'object' && item !== null && 'items' in item ? ((item as { items: unknown[] }).items ?? []) : [item]
  ) as Value[];
  return flatItems.find((item) => stringifyItem(item, itemToStringLabel).toLowerCase() === label.toLowerCase());
};

/**
 * Base UI cancellation is scoped to a single event, so the value change emitted on close gets its
 * own details object. Sharing the one from `onOpenChange` would let a consumer cancelling the value
 * change also cancel the close.
 */
const forkChangeEventDetails = (details: ChangeEventDetails): ChangeEventDetails => {
  let canceled = false;
  let propagationAllowed = false;
  return {
    allowPropagation: () => {
      propagationAllowed = true;
    },
    cancel: () => {
      canceled = true;
    },
    event: details.event,
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return propagationAllowed;
    },
    reason: details.reason,
    trigger: details.trigger
  } as ChangeEventDetails;
};

type ComboboxRootProps<Value, Multiple extends boolean | undefined = false> = ComboboxPrimitive.Root.Props<
  Value,
  Multiple
> & {
  /**
   * Whether text that does not match any item may be entered.
   *
   * By default, text that does not resolve to an item is discarded when the popup closes and the
   * input reverts to the selected item. When enabled, the text is instead kept and committed as the
   * value (through `onValueChange`) when the user clicks away, tabs out, or presses `Enter`.
   * Pressing `Escape` still reverts, and selecting an item is unaffected. If the text exactly
   * matches the label of an item in `items`, that item is selected instead of a custom value.
   *
   * Pass a function to build the value from the text, which is required when items are objects
   * rather than strings. The returned value must render the same text (see `itemToStringLabel`),
   * otherwise the input is reverted to the label of the value.
   *
   * Ignored when `multiple` is set.
   * @default false
   */
  allowCustomValue?: ((inputValue: string) => Value) | boolean;
};

const ComboboxRoot = <Value, Multiple extends boolean | undefined = false>({
  allowCustomValue = false,
  ...props
}: ComboboxRootProps<Value, Multiple>) => {
  type RootValue = ComboboxPrimitive.Root.Props<Value, Multiple>['value'];

  const { defaultValue, items, itemToStringLabel, multiple, onInputValueChange, onOpenChange, onValueChange } = props;

  const isEnabled = allowCustomValue !== false && !multiple;
  const isControlled = props.value !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = React.useState<RootValue>(() => defaultValue ?? null);
  const value = isControlled ? props.value : uncontrolledValue;

  const inputValueRef = React.useRef('');
  const didTypeRef = React.useRef(false);

  const changeValue = (nextValue: RootValue, details: ChangeEventDetails) => {
    onValueChange?.(nextValue as Parameters<NonNullable<typeof onValueChange>>[0], details);
    if (details.isCanceled || isControlled) {
      return;
    }
    setUncontrolledValue(nextValue);
  };

  const handleInputValueChange = (inputValue: string, details: ChangeEventDetails) => {
    onInputValueChange?.(inputValue, details);
    if (details.isCanceled) {
      return;
    }
    inputValueRef.current = inputValue;
    if (details.reason === 'input-change') {
      didTypeRef.current = true;
    }
  };

  const handleOpenChange = (open: boolean, details: ChangeEventDetails) => {
    onOpenChange?.(open, details);
    if (details.isCanceled) {
      return;
    }
    if (open) {
      // The first keystroke opens the popup, so that open must not discard what was just typed.
      if (details.reason !== 'input-change') {
        didTypeRef.current = false;
      }
      return;
    }
    const didType = didTypeRef.current;
    didTypeRef.current = false;
    if (!didType || DISCARDED_CLOSE_REASONS.includes(details.reason)) {
      return;
    }
    const inputValue = inputValueRef.current.trim();
    // An empty input already clears the value, and unchanged text is not a custom value.
    if (inputValue === '' || inputValue === stringifyItem(value as Value, itemToStringLabel)) {
      return;
    }
    const match = findItemByLabel<Value>(items, inputValue, itemToStringLabel);
    const nextValue =
      match ??
      (typeof allowCustomValue === 'function' ? allowCustomValue(inputValue) : (inputValue as unknown as Value));
    changeValue(nextValue as RootValue, forkChangeEventDetails(details));
  };

  if (!isEnabled) {
    return <ComboboxPrimitive.Root {...props} />;
  }

  return (
    <ComboboxPrimitive.Root
      {...props}
      defaultValue={undefined}
      value={value}
      onInputValueChange={handleInputValueChange}
      onOpenChange={handleOpenChange}
      onValueChange={changeValue}
    />
  );
};

export { ComboboxRoot, type ComboboxRootProps };
