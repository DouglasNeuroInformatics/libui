import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { ComboBox, Label } from '#components';
import { useTranslation } from '#hooks';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

type ComboBoxItem<T extends string> = { label: string; value: T };

export type StringFieldComboBoxProps<T extends string = string> = Simplify<
  BaseFieldComponentProps<T> & Extract<StringFormField<T>, { options: object }>
>;

export const StringFieldComboBox = <T extends string = string>({
  description,
  disabled,
  error,
  label,
  name,
  options,
  readOnly,
  setValue,
  value
}: StringFieldComboBoxProps<T>) => {
  const items = Object.keys(options).map((option) => ({
    label: options[option as T],
    value: option as T
  }));
  const selected = items.find((item) => item.value === value) ?? null;
  const { t } = useTranslation();
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <ComboBox
        isItemEqualToValue={(a: ComboBoxItem<T> | null, b: ComboBoxItem<T> | null) => a?.value === b?.value}
        items={items}
        value={selected}
        onValueChange={(item: ComboBoxItem<T> | null) => setValue(item?.value)}
      >
        <ComboBox.Input showClear data-testid={`${name}-combobox-input`} disabled={disabled || readOnly} name={name} />
        <ComboBox.Content data-testid={`${name}-combobox-content`}>
          <ComboBox.Empty>{t({ en: 'No Results', fr: 'Aucun résultat' })}</ComboBox.Empty>
          <ComboBox.List>
            {(item: ComboBoxItem<T>) => (
              <ComboBox.Item data-testid={`${name}-combobox-item-${item.value}`} key={item.value} value={item}>
                {item.label}
              </ComboBox.Item>
            )}
          </ComboBox.List>
        </ComboBox.Content>
      </ComboBox>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
