import type { OptionsFormField } from '@douglasneuroinformatics/libui-form-types';

import { Label } from '@/components/Label';
import { Select } from '@/components/Select';

import { FieldGroup } from '../FieldGroup';
import { type BaseFieldComponentProps } from '../types';

export type OptionsFieldProps<T extends string = string> = BaseFieldComponentProps<T> & OptionsFormField<T>;

export const OptionsField = <T extends string = string>({
  description,
  error,
  label,
  name,
  options,
  setValue,
  value
}: OptionsFieldProps<T>) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Select name={name} value={value ?? ''} onValueChange={(value: T) => setValue(value)}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {Object.keys(options).map((option) => (
            <Select.Item key={option} value={option}>
              {options[option as T]}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
