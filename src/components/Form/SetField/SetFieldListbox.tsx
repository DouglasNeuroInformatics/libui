import { Checkbox } from '@/components/Checkbox';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';

import type { SetFieldProps } from './SetField';

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
            <Label className="font-normal text-muted-foreground" htmlFor={`${name}-${option}`}>
              {options[option as T]}
            </Label>
          </FieldGroup.Row>
        ))}
      </div>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
