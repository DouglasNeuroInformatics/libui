import type { BinaryFormField } from '@douglasneuroinformatics/libui-form-types';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import type { Simplify } from 'type-fest';

import { Checkbox } from '../Checkbox';
import { Label } from '../Label';
import { RadioGroup } from '../RadioGroup';
import { FormFieldContainer } from './FormFieldContainer';

import type { BaseFieldComponentProps } from './types';

export type BinaryFieldProps = Simplify<BaseFieldComponentProps<boolean> & BinaryFormField>;

export const BinaryField = ({ description, error, label, name, setValue, value, ...props }: BinaryFieldProps) => {
  const { t } = useTranslation('libui');
  return (
    <FormFieldContainer description={description} error={error}>
      {match(props)
        .with({ variant: 'radio' }, ({ options }) => (
          <RadioGroup value={value ? String(value) : undefined}>
            <div className="flex items-center space-x-2">
              <RadioGroup.Item id="true" value="true" />
              <Label htmlFor="true">{options?.t ?? t('form.radioLabels.true')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroup.Item id="r2" value="comfortable" />
              <Label htmlFor="r2">{options?.f ?? t('form.radioLabels.false')}</Label>
            </div>
          </RadioGroup>
        ))
        .with({ variant: 'checkbox' }, () => (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value}
              id={name}
              name={name}
              onCheckedChange={(value) => {
                if (typeof value === 'boolean') {
                  setValue(value);
                }
              }}
            />
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={name}
            >
              {label}
            </label>
          </div>
        ))
        .exhaustive()}
    </FormFieldContainer>
  );
};
