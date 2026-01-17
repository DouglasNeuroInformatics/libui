import { match } from 'ts-pattern';

import { StringFieldInput } from './StringFieldInput.tsx';
import { StringFieldPassword } from './StringFieldPassword.tsx';
import { StringFieldRadio } from './StringFieldRadio.tsx';
import { StringFieldSelect } from './StringFieldSelect.tsx';
import { StringFieldTextArea } from './StringFieldTextArea.tsx';

import type { StringFieldInputProps } from './StringFieldInput.tsx';
import type { StringFieldPasswordProps } from './StringFieldPassword.tsx';
import type { StringFieldRadioProps } from './StringFieldRadio.tsx';
import type { StringFieldTextAreaProps } from './StringFieldTextArea.tsx';

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
