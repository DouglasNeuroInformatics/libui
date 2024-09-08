import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';

import { Label } from '@/components/Label';
import { TextArea } from '@/components/TextArea';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type StringFieldTextAreaProps = BaseFieldComponentProps<string> &
  Extract<StringFormField, { variant: 'input' | 'textarea' }>;

export const StringFieldTextArea = ({
  description,
  disabled,
  error,
  label,
  name,
  placeholder,
  readOnly,
  setValue,
  value
}: StringFieldTextAreaProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label htmlFor={name}>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <TextArea
        disabled={disabled || readOnly}
        id={name}
        name={name}
        placeholder={placeholder}
        rows={5}
        value={value ?? ''}
        onChange={(event) => setValue(event.target.value)}
      />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
