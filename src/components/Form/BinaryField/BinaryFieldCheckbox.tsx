import type { BinaryFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '@/components';
import { Checkbox } from '@/components/Checkbox';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type BinaryFieldCheckboxProps = Simplify<
  Extract<BaseFieldComponentProps<boolean> & BinaryFormField, { variant: 'checkbox' }>
>;

export const BinaryFieldCheckbox = ({ error, label, name, setValue, value }: BinaryFieldCheckboxProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Checkbox
          checked={value}
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
