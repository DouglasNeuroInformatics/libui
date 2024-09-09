import { match } from 'ts-pattern';

import { BooleanFieldCheckbox, type BooleanFieldCheckboxProps } from './BooleanFieldCheckbox';
import { BooleanFieldRadio, type BooleanFieldRadioProps } from './BooleanFieldRadio';

export type BooleanFieldProps = BooleanFieldCheckboxProps | BooleanFieldRadioProps;

export const BooleanField = (props: BooleanFieldProps) => {
  return match(props)
    .with({ variant: 'radio' }, (props) => <BooleanFieldRadio {...props} />)
    .with({ variant: 'checkbox' }, (props) => <BooleanFieldCheckbox {...props} />)
    .exhaustive();
};
