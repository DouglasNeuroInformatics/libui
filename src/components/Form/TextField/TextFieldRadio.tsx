import type { TextFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { BaseRadioField } from '../BaseRadioField';

import type { BaseFieldComponentProps } from '../types';

export type TextFieldRadioProps<T extends string = string> = Simplify<
  BaseFieldComponentProps<T> & Extract<TextFormField<T>, { options: object }>
>;

export const TextFieldRadio = <T extends string = string>(props: TextFieldRadioProps<T>) => {
  return <BaseRadioField {...props} />;
};
