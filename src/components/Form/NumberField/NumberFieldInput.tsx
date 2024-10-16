import { useState } from 'react';
import * as React from 'react';

import { parseNumber } from '@douglasneuroinformatics/libjs';
import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type NumberFieldInputProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { variant: 'input' }>
>;

export const NumberFieldInput = ({
  description,
  disabled,
  error,
  label,
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  name,
  readOnly,
  setValue,
  value
}: NumberFieldInputProps) => {
  const [inputValue, setInputValue] = useState(value?.toString() ?? '');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue: number | undefined = value;
    if (/^[+-]?$/.test(event.target.value)) {
      newValue = undefined;
      setInputValue(event.target.value);
    } else {
      const parsedValue = parseNumber(event.target.value);
      if (parsedValue >= min && parsedValue <= max) {
        newValue = parsedValue;
        setInputValue(event.target.value);
      }
    }
    setValue(newValue);
  };

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Input
        disabled={disabled || readOnly}
        max={max}
        min={min}
        name={name}
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
