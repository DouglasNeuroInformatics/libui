import React from 'react';

import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';

import { Label } from '../../Label/Label.js';
import { TextArea } from '../../TextArea/TextArea.js';
import { FieldGroup } from '../FieldGroup/FieldGroup.js';

import type { BaseFieldComponentProps } from '../types.js';

export type StringFieldTextAreaProps = BaseFieldComponentProps<string> & StringFormField;

export const StringFieldTextArea = ({ description, error, label, name, setValue, value }: StringFieldTextAreaProps) => {
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label htmlFor={name}>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <TextArea id={name} name={name} rows={5} value={value ?? ''} onChange={(event) => setValue(event.target.value)} />
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
