import { match } from 'ts-pattern';

import { StringFieldInput } from './StringFieldInput';
import { StringFieldPassword } from './StringFieldPassword';
import { StringFieldRadio } from './StringFieldRadio';
import { StringFieldSelect } from './StringFieldSelect';
import { StringFieldTextArea } from './StringFieldTextArea';

import type { StringFieldInputProps } from './StringFieldInput';
import type { StringFieldPasswordProps } from './StringFieldPassword';
import type { StringFieldRadioProps } from './StringFieldRadio';
import type { StringFieldTextAreaProps } from './StringFieldTextArea';

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
