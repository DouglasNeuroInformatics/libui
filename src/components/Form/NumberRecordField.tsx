import type {
  NumberRecordFieldValue,
  NumberRecordFormField,
  RequiredFieldValue
} from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import type { BaseFieldComponentProps } from './types';

export type NumberRecordFieldProps<T extends NumberRecordFieldValue = NumberRecordFieldValue> = Simplify<
  BaseFieldComponentProps<NumberRecordFieldValue> & NumberRecordFormField<RequiredFieldValue<T>>
>;

export const NumberRecordField = <T extends NumberRecordFieldValue = NumberRecordFieldValue>(
  props: NumberRecordFieldProps<T>
) => {
  return JSON.stringify(props);
};
