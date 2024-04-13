import { match } from 'ts-pattern';

import { NumberFieldInput, type NumberFieldInputProps } from './NumberFieldInput.js';
import { NumberFieldRadio, type NumberFieldRadioProps } from './NumberFieldRadio.js';
import { NumberFieldSlider, type NumberFieldSliderProps } from './NumberFieldSlider.js';

export type NumberFieldProps = NumberFieldInputProps | NumberFieldRadioProps | NumberFieldSliderProps;

export const NumberField = (props: NumberFieldProps) => {
  return match(props)
    .with({ variant: 'input' }, (props) => <NumberFieldInput {...props} />)
    .with({ variant: 'slider' }, (props) => <NumberFieldSlider {...props} />)
    .with({ variant: 'radio' }, (props) => <NumberFieldRadio {...props} />)
    .exhaustive();
};
