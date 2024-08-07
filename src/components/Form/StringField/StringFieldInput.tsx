import React from 'react';

import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';

import { Input } from '../../Input/Input.js';
import { Label } from '../../Label/Label.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';

import type { BaseFieldComponentProps } from '../types.js';

export type StringFieldInputProps = BaseFieldComponentProps<string> &
  Extract<StringFormField, { variant: 'input' | 'textarea' }>;

export const StringFieldInput = ({
  description,
  error,
  label,
  name,
  placeholder,
  readOnly,
  setValue,
  value
}: StringFieldInputProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label htmlFor={name}>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Input
        disabled={readOnly}
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
