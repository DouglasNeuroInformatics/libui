import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';

import { Input } from '../../Input/Input.js';
import { Label } from '../../Label/Label.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';

import type { BaseFieldComponentProps } from '../types.js';

export type StringFieldInputProps = BaseFieldComponentProps<string> & StringFormField;

export const StringFieldInput = ({ description, error, label, name, setValue, value }: StringFieldInputProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <Input name={name} type="text" value={value ?? ''} onChange={(event) => setValue(event.target.value)} />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
