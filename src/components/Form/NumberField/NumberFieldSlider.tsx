import React from 'react';

import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '../../Label/Label.js';
import { Slider } from '../../Slider/Slider.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';

import type { BaseFieldComponentProps } from '../types.js';

export type NumberFieldSliderProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { variant: 'slider' }>
>;

export const NumberFieldSlider = ({
  description,
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
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <FieldGroup.Row>
        <Slider
          disabled={readOnly}
          max={max}
          min={min}
          name={name}
          value={[value ?? 0]}
          onValueChange={([value]) => setValue(value)}
        />
        <span className="flex h-full w-8 items-center justify-center text-sm text-muted-foreground">
          {value ?? 'NA'}
        </span>
      </FieldGroup.Row>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
