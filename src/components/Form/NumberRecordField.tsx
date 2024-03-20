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
  error: recordError,
  items,
  label,
  options,
  setError: setRecordError,
  setValue: setRecordValue,
  value: recordValue
}: NumberRecordFieldProps<T>) => {
  return (
    <div className="space-y-4">
      <Heading variant="h5">{label}</Heading>
      <div className="space-y-8">
        {Object.keys(items).map((name) => {
          const item = items[name];
          return (
            <NumberField
              error={recordError?.[name]}
              key={name}
              kind="number"
              name={name}
              options={options}
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
