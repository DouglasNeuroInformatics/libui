import type {
  BooleanFormField,
  DateFormField,
  NumberFormField,
  ScalarFieldValue,
  SetFormField,
  StringFormField
} from '@douglasneuroinformatics/libui-form-types';

import { BooleanField } from './BooleanField';
import { DateField } from './DateField';
import { NumberField } from './NumberField';
import { SetField } from './SetField';
import { StringField } from './StringField';

import type { BooleanFieldProps } from './BooleanField';
import type { DateFieldProps } from './DateField';
import type { NumberFieldProps } from './NumberField';
import type { SetFieldProps } from './SetField';
import type { StringFieldProps } from './StringField';
import type { BaseFieldComponentProps } from './types';

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
