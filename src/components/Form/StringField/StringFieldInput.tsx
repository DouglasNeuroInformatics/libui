import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';

import { Input, Label } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

export type StringFieldInputProps = BaseFieldComponentProps<string> &
  Extract<StringFormField, { variant: 'input' | 'textarea' }>;

export const StringFieldInput = ({
  description,
  disabled,
  error,
  label,
  name,
  placeholder,
  readOnly,
  setValue,
  value
}: StringFieldInputProps) => {
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label htmlFor={name}>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Input
        disabled={disabled || readOnly}
        id={name}
        name={name}
        placeholder={placeholder}
        type="text"
        value={value ?? ''}
        onChange={(event) => setValue(event.target.value)}
      />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
