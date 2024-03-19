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
  BaseFieldComponentProps<T> & {
    description?: string;
    label: string;
    options: Record<T, string>;
    orientation?: 'horizontal' | 'vertical';
  }
>;

export const BaseRadioField = <T extends string>({
  description,
  error,
  label,
  name,
  options,
  orientation = 'vertical',
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
            <RadioGroup.Item id={`${name}-${option}`} value={option} />
            <Label className="font-normal" htmlFor={`${name}-${option}`}>
              {options[option as T]}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
