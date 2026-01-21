import { Checkbox, Label } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { SetFieldProps } from './SetField.tsx';

export type SetFieldListboxProps<T extends string = string> = SetFieldProps<T> & {
  onCheckedChange: (option: T, isChecked: boolean) => void;
};

export const SetFieldListbox = <T extends string = string>({
  description,
  disabled,
  error,
  label,
  name,
  onCheckedChange,
  options,
  readOnly,
  value
}: SetFieldListboxProps<T>) => {
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <div className="grid gap-2">
        {Object.keys(options).map((option) => (
          <FieldGroup.Row key={option}>
            <Checkbox
              checked={value?.has(option as T) ?? false}
              disabled={disabled || readOnly}
              id={`${name}-${option}`}
              onCheckedChange={(checked) => {
                onCheckedChange(option as T, !checked);
              }}
            />
            <Label className="text-muted-foreground font-normal" htmlFor={`${name}-${option}`}>
              {options[option as T]}
            </Label>
          </FieldGroup.Row>
        ))}
      </div>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
