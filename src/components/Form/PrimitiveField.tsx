import type {
  BooleanFormField,
  DateFormField,
  EnumFormField,
  NumericFormField,
  PrimitiveFieldValue,
  TextFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BooleanField, type BooleanFieldProps } from './BooleanField';
import { DateField, type DateFieldProps } from './DateField';
import { EnumField, type EnumFieldProps } from './EnumField';
import { NumericField, type NumericFieldProps } from './NumericField';
import { TextField, type TextFieldProps } from './TextField';

import type { BaseFieldComponentProps } from './types';

export type PrimitiveFieldProps = BaseFieldComponentProps<PrimitiveFieldValue> & {
  field: BooleanFormField | DateFormField | EnumFormField | NumericFormField | TextFormField;
};

export const PrimitiveField = ({ field, ...props }: PrimitiveFieldProps) => {
  switch (field.kind) {
    case 'text':
      return <TextField {...field} {...(props as TextFieldProps)} />;
    case 'numeric':
      return <NumericField {...field} {...(props as NumericFieldProps)} />;
    case 'enum':
      return <EnumField {...field} {...(props as EnumFieldProps)} />;
    case 'date':
      return <DateField {...field} {...(props as DateFieldProps)} />;
    case 'boolean':
      return <BooleanField {...field} {...(props as BooleanFieldProps)} />;
  }
};
