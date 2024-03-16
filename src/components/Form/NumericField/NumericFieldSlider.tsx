import type { NumericFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '@/components/Label';
import { Slider } from '@/components/Slider';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type NumericFieldSliderProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumericFormField, { variant: 'slider' }>
>;

export const NumericFieldSlider = ({
  description,
  error,
  label,
  max,
  min,
  name,
  setValue,
  value
}: NumericFieldSliderProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <FieldGroup.Row>
        <Slider max={max} min={min} name={name} value={[value ?? 0]} onValueChange={([value]) => setValue(value)} />
        <span className="flex h-full w-8 items-center justify-center text-sm text-muted-foreground">
          {value ?? 'NA'}
        </span>
      </FieldGroup.Row>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
