import React from 'react';

import type { FormDataType, FormFields, PartialFormDataType } from '@douglasneuroinformatics/libui-form-types';

import { DynamicField } from './DynamicField.js';
import { StaticField } from './StaticField.js';

import type { FormErrors } from './types.js';

export type FieldsComponentProps<T extends FormDataType> = {
  errors: FormErrors<T>;
  fields: FormFields<T>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>;
  setValues: React.Dispatch<React.SetStateAction<PartialFormDataType<T>>>;
  values: PartialFormDataType<T>;
};

/** Renders an object containing key value pairs, where the value is a FormField of some kind */
export const FieldsComponent = <T extends FormDataType>({ fields, ...props }: FieldsComponentProps<T>) => {
  return Object.keys(fields).map((name) => {
    const field = fields[name];
    if (field.kind === 'dynamic') {
      return <DynamicField {...props} field={field} key={name} name={name} />;
    }
    return <StaticField {...props} field={field} key={name} name={name} />;
  });
};
