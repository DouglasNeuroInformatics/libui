import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type NumberFieldDefaultProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { variant: 'default' }>
>;

export const NumberFieldDefault = ({
  description,
  error,
  label,
  max,
  min,
  name,
  setValue,
  value
}: NumberFieldDefaultProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseFloat(event.target.value);
    if (Number.isNaN(newValue)) {
      setValue(undefined);
    } else if (newValue >= (min ?? -Infinity) && newValue <= (max ?? Infinity)) {
      setValue(newValue);
    }
  };
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Input max={max} min={min} name={name} type="text" value={value ?? ''} onChange={handleChange} />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
