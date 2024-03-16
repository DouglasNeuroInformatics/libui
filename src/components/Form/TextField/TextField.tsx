import { match } from 'ts-pattern';

import { TextFieldLong, type TextFieldLongProps } from './TextFieldLong';
import { TextFieldPassword, type TextFieldPasswordProps } from './TextFieldPassword';
import { TextFieldShort, type TextFieldShortProps } from './TextFieldShort';

export type TextFieldProps = TextFieldLongProps | TextFieldPasswordProps | TextFieldShortProps;

export const TextField = (props: TextFieldProps) => {
  return match(props)
    .with({ variant: 'long' }, (props) => <TextFieldLong {...props} />)
    .with({ variant: 'password' }, (props) => <TextFieldPassword {...props} />)
    .with({ variant: 'short' }, () => <TextFieldShort {...props} />)
    .exhaustive();
};
