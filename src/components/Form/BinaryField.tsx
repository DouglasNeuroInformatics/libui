import { match } from 'ts-pattern';

import { BinaryFieldCheckbox, type BinaryFieldCheckboxProps } from './BinaryFieldCheckbox';
import { BinaryFieldRadio, type BinaryFieldRadioProps } from './BinaryFieldRadio';

export type BinaryFieldProps = BinaryFieldCheckboxProps | BinaryFieldRadioProps;

export const BinaryField = (props: BinaryFieldProps) => {
  return match(props)
    .with({ variant: 'radio' }, (props) => <BinaryFieldRadio {...props} />)
    .with({ variant: 'checkbox' }, (props) => <BinaryFieldCheckbox {...props} />)
    .exhaustive();
};
