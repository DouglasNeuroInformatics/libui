import { useEffect } from 'react';

import type { SetFormField } from '@douglasneuroinformatics/libui-form-types';
import { match } from 'ts-pattern';
import type { Simplify } from 'type-fest';

import { SetFieldListbox } from './SetFieldListbox.tsx';
import { SetFieldSelect } from './SetFieldSelect.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

export type SetFieldProps<T extends string = string> = Simplify<BaseFieldComponentProps<Set<T>> & SetFormField<Set<T>>>;

export const SetField = <T extends string = string>(props: SetFieldProps<T>) => {
  useEffect(() => {
    if (!props.value) {
      props.setValue(new Set([]));
    }
  }, [props.value]);

  const exclusiveOptions = new Set<string>(props.exclusiveOptions);

  /**
   * An option is disabled when a different option that is exclusive is selected. A selected exclusive
   * option is never disabled, so that the user can always deselect it (e.g., if several exclusive
   * options were set programmatically).
   */
  const isOptionDisabled = (option: T) => {
    if (!props.value || (props.value.has(option) && exclusiveOptions.has(option))) {
      return false;
    }
    for (const selected of props.value) {
      if (selected !== option && exclusiveOptions.has(selected)) {
        return true;
      }
    }
    return false;
  };

  const handleCheckedChange = (option: T, isChecked: boolean) => {
    if (isChecked) {
      const updatedValue = new Set<T>(props.value);
      updatedValue.delete(option);
      props.setValue(updatedValue);
    } else if (isOptionDisabled(option)) {
      return;
    } else if (exclusiveOptions.has(option)) {
      // selecting an exclusive option deselects all other options
      props.setValue(new Set<T>([option]));
    } else {
      const updatedValue = new Set<T>(props.value);
      updatedValue.add(option);
      props.setValue(updatedValue);
    }
  };

  const variantProps = { isOptionDisabled, onCheckedChange: handleCheckedChange };

  return match(props)
    .with({ variant: 'select' }, (props) => <SetFieldSelect {...variantProps} {...props} />)
    .with({ variant: 'listbox' }, (props) => <SetFieldListbox {...variantProps} {...props} />)
    .exhaustive();
};
