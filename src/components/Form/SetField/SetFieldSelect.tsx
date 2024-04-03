import { Badge } from '@/components/Badge';
import { DropdownButton } from '@/components/DropdownButton';
import { DropdownMenu } from '@/components/DropdownMenu';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';

import type { SetFieldProps } from './SetField';

export type SetFieldSelectProps<T extends string = string> = SetFieldProps<T> & {
  onCheckedChange: (option: T, isChecked: boolean) => void;
};

export const SetFieldSelect = <T extends string = string>({
  description,
  error,
  label,
  onCheckedChange,
  options,
  value
}: SetFieldSelectProps<T>) => {
  return value ? (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild className="w-full">
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
