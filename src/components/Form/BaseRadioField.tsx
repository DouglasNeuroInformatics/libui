import { cva } from 'class-variance-authority';
import type { Simplify } from 'type-fest';

import { Label } from '../Label';
import { RadioGroup } from '../RadioGroup';
import { FieldGroup } from './FieldGroup';

import type { BaseFieldComponentProps } from './types';

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
    disabled?: boolean;
    label: string;
    options: { [K in T]: string };
    orientation?: 'horizontal' | 'vertical';
  } & BaseFieldComponentProps<T>
>;

export const BaseRadioField = <T extends string>({
  description,
  disabled,
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
    <FieldGroup name={name}>
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
            <RadioGroup.Item disabled={disabled || readOnly} id={`${name}-${option}`} value={option} />
            <Label
              aria-disabled={disabled || readOnly}
              className="font-normal text-muted-foreground"
              htmlFor={`${name}-${option}`}
            >
              {options[option as T]}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
