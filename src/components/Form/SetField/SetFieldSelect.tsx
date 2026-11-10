import { Badge, DropdownButton, DropdownMenu, Label } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { SetFieldProps } from './SetField.tsx';

export type SetFieldSelectProps<T extends string = string> = SetFieldProps<T> & {
  isOptionDisabled: (option: T) => boolean;
  onCheckedChange: (option: T, isChecked: boolean) => void;
};

export const SetFieldSelect = <T extends string = string>({
  description,
  disabled,
  error,
  isOptionDisabled,
  label,
  name,
  onCheckedChange,
  options,
  readOnly,
  value
}: SetFieldSelectProps<T>) => {
  return value ? (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild className="w-full" disabled={disabled || readOnly}>
          <DropdownButton>
            {value.size ? (
              <div className="flex items-center gap-2">
                {Array.from(value).map((option) => (
                  <Badge className="font-normal" key={option} variant="outline">
                    {options[option]}
                  </Badge>
                ))}
              </div>
            ) : null}
          </DropdownButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content widthFull align="start">
          {Object.keys(options).map((option) => {
            const checked = value.has(option as T);
            const isDisabled = isOptionDisabled(option as T);
            return (
              <DropdownMenu.CheckboxItem
                checked={checked}
                disabled={isDisabled}
                key={option}
                onSelect={(event) => {
                  event.preventDefault();
                  if (isDisabled) {
                    return;
                  }
                  onCheckedChange(option as T, checked);
                }}
              >
                {options[option as T]}
              </DropdownMenu.CheckboxItem>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  ) : null;
};
