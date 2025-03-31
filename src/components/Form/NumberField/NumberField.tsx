import { match } from 'ts-pattern';

import { NumberFieldInput } from './NumberFieldInput';
import { NumberFieldRadio } from './NumberFieldRadio';
import { NumberFieldSelect } from './NumberFieldSelect';
import { NumberFieldSlider } from './NumberFieldSlider';

import type { NumberFieldInputProps } from './NumberFieldInput';
import type { NumberFieldRadioProps } from './NumberFieldRadio';
import type { NumberFieldSliderProps } from './NumberFieldSlider';

export type NumberFieldProps = NumberFieldInputProps | NumberFieldRadioProps | NumberFieldSliderProps;

export const NumberField = (props: NumberFieldProps) => {
  return match(props)
    .with({ variant: 'input' }, (props) => <NumberFieldInput {...props} />)
    .with({ variant: 'slider' }, (props) => <NumberFieldSlider {...props} />)
    .with({ variant: 'radio' }, (props) => <NumberFieldRadio {...props} />)
    .with({ variant: 'select' }, (props) => <NumberFieldSelect {...props} />)
    .exhaustive();
};
