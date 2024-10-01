import type { BooleanFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Checkbox } from '@/components/Checkbox';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type BooleanFieldCheckboxProps = Simplify<
  BaseFieldComponentProps<boolean> & Omit<Extract<BooleanFormField, { variant: 'checkbox' }>, 'kind'>
>;

export const BooleanFieldCheckbox = ({
  disabled,
  error,
  label,
  name,
  readOnly,
  setValue,
  value
}: BooleanFieldCheckboxProps) => {
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Checkbox
          checked={value}
          disabled={disabled || readOnly}
          id={name}
          name={name}
          onCheckedChange={(value) => {
            if (typeof value === 'boolean') {
              setValue(value);
            }
          }}
        />
        <Label htmlFor={name}>{label}</Label>
      </FieldGroup.Row>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
