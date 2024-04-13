import React, { useEffect } from 'react';

import type { SetFormField } from '@douglasneuroinformatics/libui-form-types';
import { match } from 'ts-pattern';
import type { Simplify } from 'type-fest';

import { SetFieldListbox } from './SetFieldListbox.js';
import { SetFieldSelect } from './SetFieldSelect.js';

import type { BaseFieldComponentProps } from '../types.js';

export type SetFieldProps<T extends string = string> = Simplify<BaseFieldComponentProps<Set<T>> & SetFormField<Set<T>>>;

export const SetField = <T extends string = string>(props: SetFieldProps<T>) => {
  useEffect(() => {
    if (!props.value) {
      props.setValue(new Set([]));
    }
  }, [props.value]);

  const handleCheckedChange = (option: T, isChecked: boolean) => {
    if (isChecked) {
      const updatedValue = new Set<T>(props.value);
      updatedValue.delete(option);
      props.setValue(updatedValue);
    } else {
      const updatedValue = new Set<T>(props.value);
      updatedValue.add(option);
      props.setValue(updatedValue);
    }
  };

  return match(props)
    .with({ variant: 'select' }, (props) => <SetFieldSelect onCheckedChange={handleCheckedChange} {...props} />)
    .with({ variant: 'listbox' }, (props) => <SetFieldListbox onCheckedChange={handleCheckedChange} {...props} />)
    .exhaustive();
};
