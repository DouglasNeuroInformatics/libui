import { useEffect, useId, useRef, useState } from 'react';

import { parseNumber } from '@douglasneuroinformatics/libjs';
import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Input, Label } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

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
  const id = useId();
  const [inputValue, setInputValue] = useState(value?.toString() ?? '');
  const valueRef = useRef<number | undefined>(value);

  const parseInputValue = (value: string) => {
    const isSignOrEmpty = /^[+-]?$/.test(value);
    if (isSignOrEmpty) {
      return undefined;
    } else {
      const parsedValue = parseNumber(value);
      if (parsedValue >= min && parsedValue <= max) {
        return parsedValue;
      }
    }
    return NaN;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const updatedValue = parseInputValue(event.target.value);
    if (Number.isNaN(updatedValue)) {
      return;
    }
    setInputValue(event.target.value);
    setValue(updatedValue);
    valueRef.current = updatedValue;
  };

  useEffect(() => {
    if (valueRef.current === value) {
      return;
    }
    const updatedInputValue = value?.toString() ?? '';
    setInputValue(updatedInputValue);
    valueRef.current = value;
  }, [value]);

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label htmlFor={id}>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Input
        disabled={disabled || readOnly}
        id={id}
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
