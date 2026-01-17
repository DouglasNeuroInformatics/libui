import type {
  BooleanFormField,
  DateFormField,
  NumberFormField,
  ScalarFieldValue,
  SetFormField,
  StringFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BooleanField } from './BooleanField/BooleanField.tsx';
import { DateField } from './DateField/DateField.tsx';
import { NumberField } from './NumberField/NumberField.tsx';
import { SetField } from './SetField/SetField.tsx';
import { StringField } from './StringField/StringField.tsx';

import type { BooleanFieldProps } from './BooleanField/BooleanField.tsx';
import type { DateFieldProps } from './DateField/DateField.tsx';
import type { NumberFieldProps } from './NumberField/NumberField.tsx';
import type { SetFieldProps } from './SetField/SetField.tsx';
import type { StringFieldProps } from './StringField/StringField.tsx';
import type { BaseFieldComponentProps } from './types.ts';

export type ScalarFieldProps = BaseFieldComponentProps<ScalarFieldValue> & {
  field: BooleanFormField | DateFormField | NumberFormField | SetFormField | StringFormField;
};

export const ScalarField = ({ field, ...props }: ScalarFieldProps) => {
  switch (field.kind) {
    case 'boolean':
      return <BooleanField {...field} {...(props as BooleanFieldProps)} />;
    case 'date':
      return <DateField {...field} {...(props as DateFieldProps)} />;
    case 'number':
      return <NumberField {...field} {...(props as NumberFieldProps)} />;
    case 'set':
      return <SetField {...field} {...(props as SetFieldProps)} />;
    case 'string':
      return <StringField {...field} {...(props as StringFieldProps)} />;
    default:
      throw new Error(`Unexpected value for kind: ${Reflect.get(field, 'kind') satisfies never}`);
  }
};
