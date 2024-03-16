import type { TextFormField } from '@douglasneuroinformatics/libui-form-types';

import { Label } from '@/components/Label';
import { TextArea } from '@/components/TextArea';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type TextFieldLongProps = BaseFieldComponentProps<string> & TextFormField;

export const TextFieldLong = ({ description, error, label, name, setValue, value }: TextFieldLongProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <TextArea name={name} rows={5} value={value ?? ''} onChange={(event) => setValue(event.target.value)} />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
