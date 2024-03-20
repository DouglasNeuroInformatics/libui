import type { FormDataType, FormFieldValue, ScalarFieldValue } from '@douglasneuroinformatics/libui-form-types';

export type FieldError<T extends FormFieldValue> =
  T extends NonNullable<infer TValue>
    ? TValue extends NonNullable<ScalarFieldValue>
      ? string
      : TValue extends Record<string, unknown>
        ? Record<string, string>
        : TValue extends Record<string, unknown>[]
          ? Record<string, string>[]
          : never
    : never;

/** Common props for all field components */
export type BaseFieldComponentProps<TValue extends FormFieldValue = FormFieldValue> = {
  error?: FieldError<TValue>;
  name: string;
  setError: (error: FieldError<TValue>) => void;
  setValue: (value: TValue | undefined) => void;
  value: TValue | undefined;
};

/** An object mapping field names to error messages, if applicable */
export type FormErrors<TData extends FormDataType = FormDataType> = {
  [K in keyof TData]?: FieldError<TData[K]>;
};
