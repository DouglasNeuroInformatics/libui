import type {
  FieldsetValue,
  FormDataType,
  FormFieldValue,
  ScalarFieldValue
} from '@douglasneuroinformatics/libui-form-types';

export type FieldError<T extends FormFieldValue = FormFieldValue> = T extends (infer U)[]
  ? U extends FieldsetValue
    ? Record<string, string>[]
    : U extends string
      ? string
      : never
  : T extends NonNullable<ScalarFieldValue>
    ? string
    : never;

/** Common props for all field components */
export type BaseFieldComponentProps<T extends FormFieldValue = FormFieldValue> = {
  error?: FieldError<T>;
  name: string;
  setError: (error: FieldError<T>) => void;
  setValue: (value: T | undefined) => void;
  value: T | undefined;
};

/** An object mapping field names to error messages, if applicable */
export type FormErrors<T extends FormDataType = FormDataType> = {
  [K in keyof T]?: T[K] extends NonNullable<ScalarFieldValue>
    ? string
    : T[K] extends NonNullable<ScalarFieldValue>
      ? Record<string, string>[]
      : never;
};
