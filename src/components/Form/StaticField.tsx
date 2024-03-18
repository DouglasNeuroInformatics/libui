import { useCallback } from 'react';

import type {
  CompositeFieldValue,
  CompositeFormField,
  FormDataType,
  FormFieldValue,
  PartialFormDataType,
  PrimitiveFieldValue
} from '@douglasneuroinformatics/libui-form-types';

import { CompositeField } from './CompositeField';
import { PrimitiveField, type PrimitiveFieldProps } from './PrimitiveField';

import type { FieldError, FormErrors } from './types';

export type StaticFieldProps<TData extends FormDataType> = {
  errors: FormErrors<TData>;
  field: CompositeFormField | PrimitiveFieldProps['field'];
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

  if (field.kind === 'composite') {
    return (
      <CompositeField
        {...field}
        error={errors[name] as Record<string, string>[]}
        name={name}
        setError={setError}
        setValue={setValue}
        value={values[name] as CompositeFieldValue}
      />
    );
  }
  return (
    <PrimitiveField
      error={errors[name] as string}
      field={field}
      name={name}
      setError={setError}
      setValue={setValue}
      value={values[name] as PrimitiveFieldValue}
    />
  );
};
