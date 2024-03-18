import type {
  CompositeFieldValue,
  FormDataType,
  FormFieldValue,
  PrimitiveFieldValue
} from '@douglasneuroinformatics/libui-form-types';

export type FieldError<T extends FormFieldValue = FormFieldValue> =
  T extends NonNullable<CompositeFieldValue>
    ? Record<string, string>[]
    : T extends NonNullable<PrimitiveFieldValue>
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
  [K in keyof T]?: T[K] extends NonNullable<PrimitiveFieldValue>
    ? string
    : T[K] extends NonNullable<PrimitiveFieldValue>
      ? Record<string, string>[]
      : never;
};
