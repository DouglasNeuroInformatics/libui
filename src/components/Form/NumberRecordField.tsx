import { useEffect, useRef } from 'react';

import type {
  NumberRecordFieldValue,
  NumberRecordFormField,
  RequiredFieldValue
} from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Heading } from '../Heading/Heading.tsx';
import { NumberField } from './NumberField/NumberField.tsx';

import type { BaseFieldComponentProps } from './types.ts';

export type NumberRecordFieldProps<T extends NumberRecordFieldValue = NumberRecordFieldValue> = Simplify<
  BaseFieldComponentProps<NumberRecordFieldValue> & NumberRecordFormField<RequiredFieldValue<T>>
>;

export const NumberRecordField = <T extends NumberRecordFieldValue = NumberRecordFieldValue>(
  props: NumberRecordFieldProps<T>
) => {
  const {
    disabled,
    error: recordError,
    items,
    label,
    readOnly,
    setError: setRecordError,
    setValue: setRecordValue,
    value: recordValue
  } = props;
  const options = props.variant === 'likert' ? props.options : undefined;
  const optionsRef = useRef(options);

  useEffect(() => {
    if (!recordValue) {
      setRecordValue({});
    }
  }, []);

  useEffect(() => {
    if (optionsRef.current !== options) {
      setRecordValue({});
      optionsRef.current = options;
    }
  }, [options]);

  if (!recordValue) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading className="font-medium" variant="h5">
        {label}
      </Heading>
      <div className="flex flex-col gap-6">
        {Object.keys(items).map((name) => {
          const item = items[name]!;
          const itemProps = {
            error: recordError?.[name],
            kind: 'number',
            name,
            readOnly: disabled || readOnly,
            setError: (error: string[]) => setRecordError({ ...recordError, [name]: error }),
            setValue: (value: number | undefined) => setRecordValue({ ...recordValue, [name]: value }),
            value: recordValue?.[name],
            ...item
          } as const;
          return props.variant === 'input' ? (
            <NumberField key={name} variant="input" {...itemProps} />
          ) : (
            <NumberField
              disableAutoPrefix={props.disableAutoPrefix}
              key={name}
              options={props.options}
              variant="radio"
              {...itemProps}
            />
          );
        })}
      </div>
    </div>
  );
};
