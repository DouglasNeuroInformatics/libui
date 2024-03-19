import { useCallback } from 'react';

import type { BooleanFormField } from '@douglasneuroinformatics/libui-form-types';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import type { Simplify } from 'type-fest';

import { Label } from '@/components/Label';
import { RadioGroup } from '@/components/RadioGroup';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

const stringifyBoolean = (value: boolean | undefined) =>
  match(value)
    .with(undefined, () => '')
    .with(true, () => 'true' as const)
    .with(false, () => 'false' as const)
    .exhaustive();

export type BooleanFieldRadioProps = Simplify<
  BaseFieldComponentProps<boolean> & Omit<Extract<BooleanFormField, { variant: 'radio' }>, 'kind'>
>;

export const BooleanFieldRadio = ({ error, label, name, options, setValue, value }: BooleanFieldRadioProps) => {
  const { t } = useTranslation('libui');

  const handleValueChange = useCallback(
    (value: string) => {
      match(value)
        .with('', () => setValue(undefined))
        .with('true', () => setValue(true))
        .with('false', () => setValue(false))
        .otherwise((value) => console.error(`Unexpected value for boolean field '${name}': ${value}`));
    },
    [match, setValue]
  );

  return (
    <FieldGroup>
      <Label>{label}</Label>
      <RadioGroup name={name} value={stringifyBoolean(value)} onValueChange={handleValueChange}>
        <FieldGroup.Row>
          <RadioGroup.Item id={`${name}-true`} value="true" />
          <Label className="font-normal" htmlFor={`${name}-true`}>
            {options?.true ?? t('form.radioLabels.true')}
          </Label>
        </FieldGroup.Row>
        <FieldGroup.Row>
          <RadioGroup.Item id={`${name}-false`} value="false" />
          <Label className="font-normal" htmlFor={`${name}-false`}>
            {options?.false ?? t('form.radioLabels.false')}
          </Label>
        </FieldGroup.Row>
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
