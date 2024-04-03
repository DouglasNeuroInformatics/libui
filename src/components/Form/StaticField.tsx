import { useCallback } from 'react';

import type {
  FormDataType,
  FormFieldValue,
  NumberRecordFieldValue,
  NumberRecordFormField,
  PartialFormDataType,
  RecordArrayFieldValue,
  RecordArrayFormField,
  ScalarFieldValue
} from '@douglasneuroinformatics/libui-form-types';
import { match } from 'ts-pattern';

import { NumberRecordField } from './NumberRecordField';
import { RecordArrayField } from './RecordArrayField';
import { ScalarField, type ScalarFieldProps } from './ScalarField';

import type { FieldError, FormErrors } from './types';

export type StaticFieldProps<TData extends FormDataType> = {
  errors: FormErrors<TData>;
  field: NumberRecordFormField | RecordArrayFormField | ScalarFieldProps['field'];
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
    .with({ kind: 'record-array' }, (field) => (
      <RecordArrayField
        {...field}
        error={errors[name] as { [key: string]: string }[]}
        name={name}
        setError={setError}
        setValue={setValue}
        value={values[name] as RecordArrayFieldValue}
      />
    ))
    .with({ kind: 'number-record' }, (field) => (
      <NumberRecordField
        {...field}
        error={errors[name] as { [key: string]: string }}
        name={name}
        setError={setError}
        setValue={setValue}
        value={values[name] as NumberRecordFieldValue}
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
