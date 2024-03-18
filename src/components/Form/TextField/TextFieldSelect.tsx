import type { TextFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '@/components/Label';
import { Select } from '@/components/Select';

import { FieldGroup } from '../FieldGroup';
import { type BaseFieldComponentProps } from '../types';

export type TextFieldSelectProps<T extends string = string> = Simplify<
  BaseFieldComponentProps<T> & Extract<TextFormField<T>, { variant: 'select' }>
>;

export const TextFieldSelect = <T extends string = string>({
  description,
  error,
  label,
  name,
  options,
  setValue,
  value
}: TextFieldSelectProps<T>) => {
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
