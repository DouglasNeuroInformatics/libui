import React from 'react';

import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { cn } from '../../../utils.js';
import { Label } from '../../Label/Label.js';
import { RadioGroup } from '../../RadioGroup/RadioGroup.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';

import type { BaseFieldComponentProps } from '../types.js';

export type NumberFieldRadioProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { options: object }>
>;

export const NumberFieldRadio = ({
  description,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: NumberFieldRadioProps) => {
  const optionsCount = Object.keys(options).length;

  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        className={cn(
          'flex',
          optionsCount > 5 ? 'flex-col' : 'flex-col @3xl:flex-row @3xl:items-center @3xl:justify-between'
        )}
        name={name}
        value={value?.toString() ?? ''}
        onValueChange={(value) => setValue(parseInt(value))}
      >
        {Object.keys(options)
          .map((val) => parseInt(val))
          .toSorted((a, b) => a - b)
          .map((val) => (
            <div className="flex items-center gap-2" key={val}>
              <RadioGroup.Item disabled={readOnly} id={`${name}-${val}`} value={val.toString()} />
              <Label aria-disabled={readOnly} className="font-normal text-muted-foreground" htmlFor={`${name}-${val}`}>
                {`${val} - ${options[val]}`}
              </Label>
            </div>
          ))}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
