import React, { useRef, useState } from 'react';

import { parseNumber } from '@douglasneuroinformatics/libjs';
import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Input } from '../../Input/Input.js';
import { Label } from '../../Label/Label.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';

import type { BaseFieldComponentProps } from '../types.js';

export type NumberFieldInputProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { variant: 'input' }>
>;

export const NumberFieldInput = ({
  description,
  error,
  label,
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  name,
  readOnly,
  setValue,
  value
}: NumberFieldInputProps) => {
  const inputValueRef = useRef(value?.toString() ?? '');
  const [inputKey, setInputKey] = useState(0);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue: number | undefined = value;
    if (/^[+-]?$/.test(event.target.value)) {
      newValue = undefined;
      inputValueRef.current = event.target.value;
    } else {
      const parsedValue = parseNumber(event.target.value);
      if (parsedValue >= min && parsedValue <= max) {
        newValue = parsedValue;
        inputValueRef.current = event.target.value;
      }
    }
    value === newValue ? setInputKey(inputKey + 1) : setValue(newValue);
  };

  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Input
        disabled={readOnly}
        max={max}
        min={min}
        name={name}
        type="text"
        value={inputValueRef.current}
        onChange={handleChange}
      />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
