import type { BinaryFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Checkbox } from '../Checkbox';
import { FieldContainer } from './FieldContainer';

import type { BaseFieldComponentProps } from './types';

export type BinaryFieldCheckboxProps = Simplify<
  Extract<BaseFieldComponentProps<boolean> & BinaryFormField, { variant: 'checkbox' }>
>;

export const BinaryFieldCheckbox = ({ description, error, label, name, setValue, value }: BinaryFieldCheckboxProps) => {
  return (
    <FieldContainer description={description} error={error}>
      <div className="flex items-center space-x-2">
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
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
    </FieldContainer>
  );
};
