import React from 'react';

import { cva } from 'class-variance-authority';
import type { Simplify } from 'type-fest';

import { Label } from '../Label/Label.js';
import { RadioGroup } from '../RadioGroup/RadioGroup.js';
import { FieldGroup } from './FieldGroup/FieldGroup.js';

import type { BaseFieldComponentProps } from './types.js';

const baseRadioFieldVariants = cva('flex', {
  defaultVariants: {
    orientation: 'vertical'
  },
  variants: {
    orientation: {
      horizontal: 'flex-col @3xl:flex-row @3xl:items-center @3xl:justify-between',
      vertical: 'flex-col'
    }
  }
});

export type BaseRadioFieldProps<T extends string> = Simplify<
  {
    description?: string;
    label: string;
    options: { [K in T]: string };
    orientation?: 'horizontal' | 'vertical';
  } & BaseFieldComponentProps<T>
>;

export const BaseRadioField = <T extends string>({
  description,
  error,
  label,
  name,
  options,
  orientation = 'vertical',
  readOnly,
  setValue,
  value
}: BaseRadioFieldProps<T>) => {
  const optionsCount = Object.keys(options).length;
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        className={baseRadioFieldVariants({ orientation: optionsCount > 5 ? 'vertical' : orientation })}
        name={name}
        value={value ?? ''}
        onValueChange={(value) => setValue(value as T)}
      >
        {Object.keys(options).map((option) => (
          <div className="flex items-center gap-2" key={option}>
            <RadioGroup.Item disabled={readOnly} id={`${name}-${option}`} value={option} />
            <Label aria-disabled={readOnly} className="font-normal text-muted-foreground" htmlFor={`${name}-${option}`}>
              {options[option as T]}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
