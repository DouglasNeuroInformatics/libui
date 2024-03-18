import type {
  BooleanFormField,
  DateFormField,
  EnumFormField,
  NumberFormField,
  ScalarFieldValue,
  SetFormField,
  TextFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BooleanField, type BooleanFieldProps } from './BooleanField';
import { DateField, type DateFieldProps } from './DateField';
import { EnumField, type EnumFieldProps } from './EnumField';
import { NumberField, type NumberFieldProps } from './NumberField';
import { SetField, type SetFieldProps } from './SetField';
import { TextField, type TextFieldProps } from './TextField';

import type { BaseFieldComponentProps } from './types';

export type ScalarFieldProps = BaseFieldComponentProps<ScalarFieldValue> & {
  field: BooleanFormField | DateFormField | EnumFormField | NumberFormField | SetFormField | TextFormField;
};

export const ScalarField = ({ field, ...props }: ScalarFieldProps) => {
  switch (field.kind) {
    case 'text':
      return <TextField {...field} {...(props as TextFieldProps)} />;
    case 'number':
      return <NumberField {...field} {...(props as NumberFieldProps)} />;
    case 'enum':
      return <EnumField {...field} {...(props as EnumFieldProps)} />;
    case 'date':
      return <DateField {...field} {...(props as DateFieldProps)} />;
    case 'boolean':
      return <BooleanField {...field} {...(props as BooleanFieldProps)} />;
    case 'set':
      return <SetField {...field} {...(props as SetFieldProps)} />;
    default:
      throw new Error(`Unexpected value for kind: ${Reflect.get(field, 'kind') satisfies never}`);
  }
};
