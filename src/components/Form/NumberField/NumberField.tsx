import { match } from 'ts-pattern';

import { NumberFieldInput, type NumberFieldInputProps } from './NumberFieldInput';
import { NumberFieldSlider, type NumberFieldSliderProps } from './NumberFieldSlider';

export type NumberFieldProps = NumberFieldInputProps | NumberFieldSliderProps;

export const NumberField = (props: NumberFieldProps) => {
  return match(props)
    .with({ variant: 'input' }, (props) => <NumberFieldInput {...props} />)
    .with({ variant: 'slider' }, (props) => <NumberFieldSlider {...props} />)
    .exhaustive();
};
