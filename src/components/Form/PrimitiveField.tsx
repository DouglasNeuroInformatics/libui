import type {
  BinaryFormField,
  DateFormField,
  NumericFormField,
  OptionsFormField,
  PrimitiveFieldValue,
  TextFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BinaryField, type BinaryFieldProps } from './BinaryField';
import { DateField, type DateFieldProps } from './DateField';
import { NumericField, type NumericFieldProps } from './NumericField';
import { OptionsField, type OptionsFieldProps } from './OptionsField';
import { TextField, type TextFieldProps } from './TextField';

import type { BaseFieldComponentProps } from './types';

export type PrimitiveFieldProps = BaseFieldComponentProps<PrimitiveFieldValue> & {
  field: BinaryFormField | DateFormField | NumericFormField | OptionsFormField | TextFormField;
};

export const PrimitiveField = ({ field, ...props }: PrimitiveFieldProps) => {
  switch (field.kind) {
    case 'text':
      return <TextField {...field} {...(props as TextFieldProps)} />;
    case 'numeric':
      return <NumericField {...field} {...(props as NumericFieldProps)} />;
    case 'options':
      return <OptionsField {...field} {...(props as OptionsFieldProps)} />;
    case 'date':
      return <DateField {...field} {...(props as DateFieldProps)} />;
    case 'binary':
      return <BinaryField {...field} {...(props as BinaryFieldProps)} />;
  }
};
