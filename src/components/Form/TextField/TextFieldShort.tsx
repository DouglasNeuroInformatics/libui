import type { TextFormField } from '@douglasneuroinformatics/libui-form-types';

import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type TextFieldShortProps = BaseFieldComponentProps<string> & TextFormField;

export const TextFieldShort = ({ description, error, label, name, setValue, value }: TextFieldShortProps) => {
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
