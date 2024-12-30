import { useEffect, useRef } from 'react';

import type {
  NumberRecordFieldValue,
  NumberRecordFormField,
  RequiredFieldValue
} from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Heading } from '../Heading';
import { NumberField } from './NumberField';

import type { BaseFieldComponentProps } from './types';

export type NumberRecordFieldProps<T extends NumberRecordFieldValue = NumberRecordFieldValue> = Simplify<
  BaseFieldComponentProps<NumberRecordFieldValue> & NumberRecordFormField<RequiredFieldValue<T>>
>;

export const NumberRecordField = <T extends NumberRecordFieldValue = NumberRecordFieldValue>({
  disabled,
  error: recordError,
  items,
  label,
  options,
  readOnly,
  setError: setRecordError,
  setValue: setRecordValue,
  value: recordValue
}: NumberRecordFieldProps<T>) => {
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
    <div className="space-y-4">
      <Heading className="font-medium" variant="h5">
        {label}
      </Heading>
      <div className="space-y-6">
        {Object.keys(items).map((name) => {
          const item = items[name]!;
          return (
            <NumberField
              error={recordError?.[name]}
              key={name}
              kind="number"
              name={name}
              options={options}
              readOnly={disabled || readOnly}
              setError={(error) => setRecordError({ ...recordError, [name]: error })}
              setValue={(value) => setRecordValue({ ...recordValue, [name]: value })}
              value={recordValue?.[name]}
              variant="radio"
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};
