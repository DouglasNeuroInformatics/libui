import { match } from 'ts-pattern';

import { BooleanFieldCheckbox } from './BooleanFieldCheckbox.tsx';
import { BooleanFieldRadio } from './BooleanFieldRadio.tsx';

import type { BooleanFieldCheckboxProps } from './BooleanFieldCheckbox.tsx';
import type { BooleanFieldRadioProps } from './BooleanFieldRadio.tsx';

export type BooleanFieldProps = BooleanFieldCheckboxProps | BooleanFieldRadioProps;

export const BooleanField = (props: BooleanFieldProps) => {
  return match(props)
    .with({ variant: 'radio' }, (props) => <BooleanFieldRadio {...props} />)
    .with({ variant: 'checkbox' }, (props) => <BooleanFieldCheckbox {...props} />)
    .exhaustive();
};
