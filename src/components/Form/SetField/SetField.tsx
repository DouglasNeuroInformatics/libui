import { useEffect } from 'react';

import type { SetFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { DropdownButton } from '@/components/DropdownButton';
import { DropdownMenu } from '@/components/DropdownMenu';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';
import { type BaseFieldComponentProps } from '../types';

export type SetFieldProps<T extends string> = Simplify<BaseFieldComponentProps<T[]> & SetFormField<T>>;

export const SetField = <T extends string = string>({
  description,
  error,
  label,
  options,
  setValue,
  value
}: SetFieldProps<T>) => {
  useEffect(() => {
    if (!value) {
      setValue([]);
    }
  }, [value]);

  return value ? (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild className="w-full">
          <DropdownButton />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content widthFull align="start">
          {Object.keys(options).map((option) => {
            const checked = value.includes(option as T);
            return (
              <DropdownMenu.CheckboxItem
                checked={checked}
                key={option}
                onSelect={(event) => {
                  event.preventDefault();
                  if (checked) {
                    setValue(value.filter((val) => val !== option));
                  } else {
                    setValue([...value, option as T]);
                  }
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
