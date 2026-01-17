import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label, Slider } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

export type NumberFieldSliderProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { variant: 'slider' }>
>;

export const NumberFieldSlider = ({
  description,
  disabled,
  error,
  label,
  max,
  min,
  name,
  readOnly,
  setValue,
  value
}: NumberFieldSliderProps) => {
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <FieldGroup.Row>
        <Slider
          disabled={disabled || readOnly}
          max={max}
          min={min}
          name={name}
          value={[value ?? 0]}
          onValueChange={([value]) => setValue(value)}
        />
        <span className="text-muted-foreground flex h-full w-8 items-center justify-center text-sm">
          {value ?? 'NA'}
        </span>
      </FieldGroup.Row>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
