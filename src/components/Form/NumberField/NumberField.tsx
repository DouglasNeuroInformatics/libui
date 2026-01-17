import { match } from 'ts-pattern';

import { NumberFieldInput } from './NumberFieldInput.tsx';
import { NumberFieldRadio } from './NumberFieldRadio.tsx';
import { NumberFieldSelect } from './NumberFieldSelect.tsx';
import { NumberFieldSlider } from './NumberFieldSlider.tsx';

import type { NumberFieldInputProps } from './NumberFieldInput.tsx';
import type { NumberFieldRadioProps } from './NumberFieldRadio.tsx';
import type { NumberFieldSliderProps } from './NumberFieldSlider.tsx';

export type NumberFieldProps = NumberFieldInputProps | NumberFieldRadioProps | NumberFieldSliderProps;

export const NumberField = (props: NumberFieldProps) => {
  return match(props)
    .with({ variant: 'input' }, (props) => <NumberFieldInput {...props} />)
    .with({ variant: 'slider' }, (props) => <NumberFieldSlider {...props} />)
    .with({ variant: 'radio' }, (props) => <NumberFieldRadio {...props} />)
    .with({ variant: 'select' }, (props) => <NumberFieldSelect {...props} />)
    .exhaustive();
};
