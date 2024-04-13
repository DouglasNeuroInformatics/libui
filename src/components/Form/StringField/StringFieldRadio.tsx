import React from 'react';

import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { BaseRadioField } from '../BaseRadioField.js';

import type { BaseFieldComponentProps } from '../types.js';

export type StringFieldRadioProps<T extends string = string> = Simplify<
  BaseFieldComponentProps<T> & Extract<StringFormField<T>, { options: object }>
>;

export const StringFieldRadio = <T extends string = string>(props: StringFieldRadioProps<T>) => {
  return <BaseRadioField {...props} />;
};
