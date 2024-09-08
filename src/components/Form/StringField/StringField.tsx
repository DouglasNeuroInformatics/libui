import { match } from 'ts-pattern';

import { StringFieldInput, type StringFieldInputProps } from './StringFieldInput.js';
import { StringFieldPassword, type StringFieldPasswordProps } from './StringFieldPassword.js';
import { StringFieldRadio, type StringFieldRadioProps } from './StringFieldRadio.js';
import { StringFieldSelect } from './StringFieldSelect.js';
import { StringFieldTextArea, type StringFieldTextAreaProps } from './StringFieldTextArea.js';

export type StringFieldProps =
  | StringFieldInputProps
  | StringFieldPasswordProps
  | StringFieldRadioProps
  | StringFieldTextAreaProps;

export const StringField = (props: StringFieldProps) => {
  return match(props)
    .with({ variant: 'textarea' }, (props) => <StringFieldTextArea {...props} />)
    .with({ variant: 'password' }, (props) => <StringFieldPassword {...props} />)
    .with({ variant: 'input' }, (props) => <StringFieldInput {...props} />)
    .with({ variant: 'select' }, (props) => <StringFieldSelect {...props} />)
    .with({ variant: 'radio' }, (props) => <StringFieldRadio {...props} />)
    .exhaustive();
};
