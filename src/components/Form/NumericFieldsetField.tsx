import type {
  NumericFieldsetFieldValue,
  NumericFieldsetFormField,
  RequiredFieldValue
} from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import type { BaseFieldComponentProps } from './types';

export type NumericFieldsetFieldProps<T extends NumericFieldsetFieldValue = NumericFieldsetFieldValue> = Simplify<
  BaseFieldComponentProps<NumericFieldsetFieldValue> & NumericFieldsetFormField<RequiredFieldValue<T>>
>;

export const NumericFieldsetField = <T extends NumericFieldsetFieldValue = NumericFieldsetFieldValue>(
  props: NumericFieldsetFieldProps<T>
) => {
  return JSON.stringify(props);
};
