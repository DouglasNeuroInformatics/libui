import type {
  BooleanFormField,
  DateFormField,
  NumberFormField,
  ScalarFieldValue,
  SetFormField,
  StringFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BooleanField, type BooleanFieldProps } from './BooleanField/BooleanField';
import { DateField, type DateFieldProps } from './DateField/DateField';
import { NumberField, type NumberFieldProps } from './NumberField/NumberField';
import { SetField, type SetFieldProps } from './SetField/SetField';
import { StringField, type StringFieldProps } from './StringField/StringField';

import type { BaseFieldComponentProps } from './types';

export type ScalarFieldProps = {
  field: BooleanFormField | DateFormField | NumberFormField | SetFormField | StringFormField;
} & BaseFieldComponentProps<ScalarFieldValue>;

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
