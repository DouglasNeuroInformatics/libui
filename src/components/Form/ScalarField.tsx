import type {
  BooleanFormField,
  DateFormField,
  NumberFormField,
  ScalarFieldValue,
  SetFormField,
  StringFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BooleanField, type BooleanFieldProps } from './BooleanField/BooleanField.js';
import { DateField, type DateFieldProps } from './DateField/DateField.js';
import { NumberField, type NumberFieldProps } from './NumberField/NumberField.js';
import { SetField, type SetFieldProps } from './SetField/SetField.js';
import { StringField, type StringFieldProps } from './StringField/StringField.js';

import type { BaseFieldComponentProps } from './types.js';

export type ScalarFieldProps = BaseFieldComponentProps<ScalarFieldValue> & {
  field: BooleanFormField | DateFormField | NumberFormField | SetFormField | StringFormField;
};

export const ScalarField = ({ field, ...props }: ScalarFieldProps) => {
  switch (field.kind) {
    case 'string':
      return <StringField {...field} {...(props as StringFieldProps)} />;
    case 'number':
      return <NumberField {...field} {...(props as NumberFieldProps)} />;
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
