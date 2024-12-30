import { useEffect, useState } from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/libjs';
import type { DateFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { DatePicker } from '@/components/DatePicker';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Popover } from '@/components/Popover';

import { FieldGroup } from '../FieldGroup';
import { type BaseFieldComponentProps } from '../types';

const isValidDateString = (s: string) => /^(\d{4})-((0[1-9])|(1[0-2]))-((0[1-9])|([12])[0-9]|3[01])$/.test(s);

export type DateFieldProps = Simplify<BaseFieldComponentProps<Date> & Omit<DateFormField, 'kind'>>;

export const DateField = ({ disabled, error, label, name, readOnly, setValue, value }: DateFieldProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value ? toBasicISOString(value) : '');

  useEffect(() => {
    const isSelecting = isDatePickerOpen || isInputFocused;
    if (isSelecting) {
      return;
    } else if (isValidDateString(inputValue)) {
      setValue(new Date(inputValue));
    } else {
      setInputValue('');
    }
  }, [isDatePickerOpen, isInputFocused]);

  useEffect(() => {
    setInputValue(value ? toBasicISOString(value) : '');
  }, [value]);

  return (
    <FieldGroup name={name}>
      <Label htmlFor={name}>{label}</Label>
      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <Popover.Trigger>
          <Input
            autoComplete="off"
            data-testid="date-input"
            disabled={disabled || readOnly}
            name={name}
            placeholder="YYYY-MM-DD"
            type="text"
            value={inputValue}
            onBlur={() => setIsInputFocused(false)}
            onChange={(event) => setInputValue(event.target.value)}
            onFocus={() => setIsInputFocused(true)}
          />
        </Popover.Trigger>
        <Popover.Content asChild align="start" autofocus={false} className="w-auto">
          <DatePicker
            onSelection={(value) => {
              setInputValue(toBasicISOString(value));
              setIsDatePickerOpen(false);
            }}
          />
        </Popover.Content>
      </Popover>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
