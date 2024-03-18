import { match } from 'ts-pattern';

import { NumberFieldDefault, type NumberFieldDefaultProps } from './NumberFieldDefault';
import { NumberFieldSlider, type NumberFieldSliderProps } from './NumberFieldSlider';

export type NumberFieldProps = NumberFieldDefaultProps | NumberFieldSliderProps;

export const NumberField = (props: NumberFieldProps) => {
  return match(props)
    .with({ variant: 'default' }, (props) => <NumberFieldDefault {...props} />)
    .with({ variant: 'slider' }, (props) => <NumberFieldSlider {...props} />)
    .exhaustive();
};
