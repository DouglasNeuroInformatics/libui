import { match } from 'ts-pattern';

import { NumericFieldDefault, type NumericFieldDefaultProps } from './NumericFieldDefault';
import { NumericFieldSlider, type NumericFieldSliderProps } from './NumericFieldSlider';

export type NumericFieldProps = NumericFieldDefaultProps | NumericFieldSliderProps;

export const NumericField = (props: NumericFieldProps) => {
  return match(props)
    .with({ variant: 'default' }, (props) => <NumericFieldDefault {...props} />)
    .with({ variant: 'slider' }, (props) => <NumericFieldSlider {...props} />)
    .exhaustive();
};
