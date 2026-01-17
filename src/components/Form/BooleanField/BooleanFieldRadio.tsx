import { useCallback } from 'react';

import type { BooleanFormField } from '@douglasneuroinformatics/libui-form-types';
import { match } from 'ts-pattern';
import type { Simplify } from 'type-fest';

import { Label, RadioGroup } from '#components';
import { useTranslation } from '#hooks';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

const stringifyBoolean = (value: boolean | undefined) =>
  match(value)
    .with(undefined, () => '')
    .with(true, () => 'true' as const)
    .with(false, () => 'false' as const)
    .exhaustive();

export type BooleanFieldRadioProps = Simplify<
  BaseFieldComponentProps<boolean> & Omit<Extract<BooleanFormField, { variant: 'radio' }>, 'kind'>
>;

export const BooleanFieldRadio = ({
  description,
  disabled,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: BooleanFieldRadioProps) => {
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
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        disabled={disabled || readOnly}
        name={name}
        value={stringifyBoolean(value)}
        onValueChange={handleValueChange}
      >
        <FieldGroup.Row>
          <RadioGroup.Item id={`${name}-true`} value="true" />
          <Label aria-disabled={disabled || readOnly} className="text-muted-foreground" htmlFor={`${name}-true`}>
            {options?.true ?? t('form.radioLabels.true')}
          </Label>
        </FieldGroup.Row>
        <FieldGroup.Row>
          <RadioGroup.Item id={`${name}-false`} value="false" />
          <Label aria-disabled={disabled || readOnly} className="text-muted-foreground" htmlFor={`${name}-false`}>
            {options?.false ?? t('form.radioLabels.false')}
          </Label>
        </FieldGroup.Row>
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
