import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label, RadioGroup } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

export type NumberFieldRadioProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { options: object }>
>;

export const NumberFieldRadio = ({
  description,
  disableAutoPrefix,
  disabled,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: NumberFieldRadioProps) => {
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        className="flex gap-2"
        name={name}
        value={value?.toString() ?? ''}
        onValueChange={(value) => setValue(parseInt(value))}
      >
        {Object.keys(options)
          .map((val) => parseInt(val))
          .toSorted((a, b) => a - b)
          .map((val) => {
            return (
              <div className="flex items-center gap-6" key={val}>
                <RadioGroup.Item disabled={disabled || readOnly} id={`${name}-${val}`} value={val.toString()} />
                <Label
                  aria-disabled={disabled || readOnly}
                  className="text-muted-foreground flex items-center font-normal"
                  htmlFor={`${name}-${val}`}
                >
                  {!disableAutoPrefix && <span className="whitespace-nowrap">{val}&nbsp;-&nbsp;</span>}
                  <span>{options[val]}</span>
                </Label>
              </div>
            );
          })}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
