import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';

import { Label, TextArea } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

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
    <FieldGroup name={name}>
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
