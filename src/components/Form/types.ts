import type { FormDataType, FormFieldValue, ScalarFieldValue } from '@douglasneuroinformatics/libui-form-types';

export type FieldError<T extends FormFieldValue> =
  T extends NonNullable<infer TValue>
    ? TValue extends NonNullable<ScalarFieldValue>
      ? string[]
      : TValue extends { [key: string]: unknown }
        ? { [key: string]: string[] }
        : TValue extends { [key: string]: unknown }[]
          ? { [key: string]: string[] }[]
          : never
    : never;

/** Common props for all field components */
export type BaseFieldComponentProps<TValue extends FormFieldValue = FormFieldValue> = {
  error?: FieldError<TValue>;
  name: string;
  readOnly?: boolean;
  setError: (error: FieldError<TValue>) => void;
  setValue: (value: TValue | undefined) => void;
  value: TValue | undefined;
};

/** An object mapping field names to error messages, if applicable */
export type FormErrors<TData extends FormDataType = FormDataType> = {
  [K in keyof TData]?: FieldError<TData[K]>;
};

export type ZodIssueLike = {
  [key: string]: any;
  readonly code: string;
  readonly message: string;
  readonly path: PropertyKey[];
};

export type ZodErrorLike = {
  cause?: unknown;
  issues: ZodIssueLike[];
  name: string;
};

export type ZodSafeParseResultLike<T> = ZodSafeParseErrorLike | ZodSafeParseSuccessLike<T>;

export type ZodSafeParseSuccessLike<TOutput> = {
  data: TOutput;
  error?: never;
  success: true;
};

export type ZodSafeParseErrorLike = {
  data?: never;
  error: ZodErrorLike;
  success: false;
};

export type ZodTypeLike<TOutput, TInput = TOutput> = {
  readonly _input: TInput;
  readonly _output: TOutput;
  safeParseAsync: (data: unknown) => Promise<ZodSafeParseResultLike<TOutput>>;
};
