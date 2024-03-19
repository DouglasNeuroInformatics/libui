import { Checkbox } from '@/components/Checkbox';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';

import type { SetFieldProps } from './SetField';

export type SetFieldListboxProps<T extends string = string> = SetFieldProps<T> & {
  onCheckedChange: (option: T, isChecked: boolean) => void;
};

export const SetFieldListbox = <T extends string = string>({
  description,
  error,
  label,
  name,
  onCheckedChange,
  options,
  value
}: SetFieldListboxProps<T>) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      {Object.keys(options).map((option) => (
        <div className="flex items-center gap-2" key={option}>
          <Checkbox
            checked={value?.has(option as T) ?? false}
            id={`${name}-${option}`}
            onCheckedChange={(checked) => {
              onCheckedChange(option as T, !checked);
            }}
          />
          <Label className="font-normal" htmlFor={`${name}-${option}`}>
            {options[option as T]}
          </Label>
        </div>
      ))}
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
