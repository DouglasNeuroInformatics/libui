import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label } from '@/components/Label';
import { RadioGroup } from '@/components/RadioGroup';
import { cn } from '@/utils';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type NumberFieldRadioProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { options: object }>
>;

export const NumberFieldRadio = ({
  description,
  disableAutoPrefix,
  disabled,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: NumberFieldRadioProps) => {
  const optionsCount = Object.keys(options).length;

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        className={cn(
          'flex',
          optionsCount > 5 ? 'flex-col' : 'flex-col @3xl:flex-row @3xl:items-center @3xl:justify-between'
        )}
        name={name}
        value={value?.toString() ?? ''}
        onValueChange={(value) => setValue(parseInt(value))}
      >
        {Object.keys(options)
          .map((val) => parseInt(val))
          .toSorted((a, b) => a - b)
          .map((val) => {
            const text = (disableAutoPrefix ? '' : `${val} - `) + options[val];
            return (
              <div className="flex items-center gap-2" key={val}>
                <RadioGroup.Item disabled={disabled || readOnly} id={`${name}-${val}`} value={val.toString()} />
                <Label
                  aria-disabled={disabled || readOnly}
                  className="font-normal text-muted-foreground"
                  htmlFor={`${name}-${val}`}
                >
                  {text}
                </Label>
              </div>
            );
          })}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
