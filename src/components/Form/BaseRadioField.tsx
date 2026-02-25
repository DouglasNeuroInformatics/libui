import type { Simplify } from 'type-fest';

import { Label } from '../Label/Label.tsx';
import { RadioGroup } from '../RadioGroup/RadioGroup.tsx';
import { FieldGroup } from './FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from './types.ts';

export type BaseRadioFieldProps<T extends string> = Simplify<
  BaseFieldComponentProps<T> & {
    description?: string;
    disabled?: boolean;
    label: string;
    options: { [K in T]: string };
  }
>;

export const BaseRadioField = <T extends string>({
  description,
  disabled,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: BaseRadioFieldProps<T>) => {
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup name={name} value={value ?? ''} onValueChange={(value) => setValue(value as T)}>
        {Object.keys(options).map((option) => (
          <div className="flex items-center gap-2" key={option}>
            <RadioGroup.Item disabled={disabled || readOnly} id={`${name}-${option}`} value={option} />
            <Label
              aria-disabled={disabled || readOnly}
              className="text-muted-foreground font-normal"
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
