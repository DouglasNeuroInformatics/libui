import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '@/components/Label';
import { RadioGroup } from '@/components/RadioGroup';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type NumberFieldRadioProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { variant: 'radio' }>
>;

export const NumberFieldRadio = ({
  description,
  error,
  label,
  name,
  options,
  setValue,
  value
}: NumberFieldRadioProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        className="flex items-center justify-between"
        name={name}
        value={value?.toString() ?? ''}
        onValueChange={(value) => setValue(parseInt(value))}
      >
        {Object.keys(options)
          .map((val) => parseInt(val))
          .toSorted((a, b) => a - b)
          .map((key) => (
            <div className="flex items-center gap-2" key={key}>
              <RadioGroup.Item id={`${name}-${key}`} value={key.toString()} />
              <Label className="font-normal" htmlFor={`${name}-${key}`}>
                {options[key]}
              </Label>
            </div>
          ))}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
