import { match } from 'ts-pattern';

import { StringFieldInput, type StringFieldInputProps } from './StringFieldInput';
import { StringFieldPassword, type StringFieldPasswordProps } from './StringFieldPassword';
import { StringFieldRadio, type StringFieldRadioProps } from './StringFieldRadio';
import { StringFieldSelect } from './StringFieldSelect';
import { StringFieldTextArea, type StringFieldTextAreaProps } from './StringFieldTextArea';

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
