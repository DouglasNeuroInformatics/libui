import React from 'react';

import { Badge } from '../../Badge/Badge.js';
import { DropdownButton } from '../../DropdownButton/DropdownButton.js';
import { DropdownMenu } from '../../DropdownMenu/DropdownMenu.js';
import { Label } from '../../Label/Label.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';

import type { SetFieldProps } from './SetField.js';

export type SetFieldSelectProps<T extends string = string> = {
  onCheckedChange: (option: T, isChecked: boolean) => void;
} & SetFieldProps<T>;

export const SetFieldSelect = <T extends string = string>({
  description,
  disabled,
  error,
  label,
  onCheckedChange,
  options,
  readOnly,
  value
}: SetFieldSelectProps<T>) => {
  return value ? (
    <FieldGroup>
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
            return (
              <DropdownMenu.CheckboxItem
                checked={checked}
                key={option}
                onSelect={(event) => {
                  event.preventDefault();
                  onCheckedChange(option as T, value.has(option as T));
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
