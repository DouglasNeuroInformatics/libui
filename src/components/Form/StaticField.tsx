import { useCallback } from 'react';

import type {
  FieldsetArrayFieldValue,
  FieldsetArrayFormField,
  FormDataType,
  FormFieldValue,
  NumericFieldsetFieldValue,
  NumericFieldsetFormField,
  PartialFormDataType,
  ScalarFieldValue
} from '@douglasneuroinformatics/libui-form-types';
import { match } from 'ts-pattern';

import { FieldsetArrayField } from './FieldsetArrayField';
import { NumericFieldsetField } from './NumericFieldsetField';
import { ScalarField, type ScalarFieldProps } from './ScalarField';

import type { FieldError, FormErrors } from './types';

export type StaticFieldProps<TData extends FormDataType> = {
  errors: FormErrors<TData>;
  field: FieldsetArrayFormField | NumericFieldsetFormField | ScalarFieldProps['field'];
  name: string;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<TData>>>;
  setValues: React.Dispatch<React.SetStateAction<PartialFormDataType<TData>>>;
  values: PartialFormDataType<TData>;
};

export const StaticField = <TData extends FormDataType>({
  errors,
  field,
  name,
  setErrors,
  setValues,
  values
}: StaticFieldProps<TData>) => {
  const setError = useCallback(
    <TValue extends FormFieldValue>(error: FieldError<TValue>) => {
      return setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    },
    [setErrors]
  );

  const setValue = useCallback(
    <TValue extends FormFieldValue>(value: TValue) => {
      return setValues((prevValues) => ({ ...prevValues, [name]: value }));
    },
    [setValues]
  );

  return match(field)
    .with({ kind: 'fieldset-array' }, (field) => (
      <FieldsetArrayField
        {...field}
        error={errors[name] as Record<string, string>[]}
        name={name}
        setError={setError}
        setValue={setValue}
        value={values[name] as FieldsetArrayFieldValue}
      />
    ))
    .with({ kind: 'numeric-fieldset' }, (field) => (
      <NumericFieldsetField
        {...field}
        error={errors[name] as Record<string, string>}
        name={name}
        setError={setError}
        setValue={setValue}
        value={values[name] as NumericFieldsetFieldValue}
      />
    ))
    .otherwise((field) => (
      <ScalarField
        error={errors[name] as string}
        field={field}
        name={name}
        setError={setError}
        setValue={setValue}
        value={values[name] as ScalarFieldValue}
      />
    ));
};
