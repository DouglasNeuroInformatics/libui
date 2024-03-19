import { match } from 'ts-pattern';

import { TextFieldInput, type TextFieldInputProps } from './TextFieldInput';
import { TextFieldPassword, type TextFieldPasswordProps } from './TextFieldPassword';
import { TextFieldRadio, type TextFieldRadioProps } from './TextFieldRadio';
import { TextFieldSelect } from './TextFieldSelect';
import { TextFieldTextArea, type TextFieldTextAreaProps } from './TextFieldTextArea';

export type TextFieldProps =
  | TextFieldInputProps
  | TextFieldPasswordProps
  | TextFieldRadioProps
  | TextFieldTextAreaProps;

export const TextField = (props: TextFieldProps) => {
  return match(props)
    .with({ variant: 'textarea' }, (props) => <TextFieldTextArea {...props} />)
    .with({ variant: 'password' }, (props) => <TextFieldPassword {...props} />)
    .with({ variant: 'input' }, (props) => <TextFieldInput {...props} />)
    .with({ variant: 'select' }, (props) => <TextFieldSelect {...props} />)
    .with({ variant: 'radio' }, (props) => <TextFieldRadio {...props} />)
    .exhaustive();
};
