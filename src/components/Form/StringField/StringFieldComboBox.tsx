import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { ComboBox, Label } from '#components';
import { useTranslation } from '#hooks';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

type ComboBoxItem<T extends string> = { label: string; value: T };

export type StringFieldComboBoxProps<T extends string = string> = Simplify<
  BaseFieldComponentProps<T> &
    Extract<StringFormField<T>, { options: object }> & {
      /**
       * Whether text that does not match any option may be entered. When enabled, text that does not
       * resolve to an option is committed as the value instead of being discarded when the popup
       * closes. Note that such a value is not a key of `options`, so the validation schema for this
       * field must accept arbitrary strings.
       * @default false
       */
      allowCustomValue?: boolean;
    }
>;

export const StringFieldComboBox = <T extends string = string>({
  allowCustomValue = false,
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
  // A custom value is absent from `items`, so it must fall back to an item built from the value
  // itself, otherwise the controlled input would revert to empty as soon as the value is committed.
  const selected =
    items.find((item) => item.value === value) ?? (allowCustomValue && value ? { label: value, value } : null);
  const { t } = useTranslation();
  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <ComboBox
        // Items are objects, so the text must be built into an item rather than committed as a string.
        allowCustomValue={
          allowCustomValue ? (inputValue: string) => ({ label: inputValue, value: inputValue as T }) : false
        }
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
