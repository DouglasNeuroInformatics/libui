import { useEffect, useState } from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/libjs';
import type { BaseFormField } from '@douglasneuroinformatics/libui-form-types';
import { ChevronDownIcon } from 'lucide-react';
import type { Simplify } from 'type-fest';

import { Button, DatePicker, Input, Label, Popover } from '#components';
import { useTranslation } from '#hooks';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

const DEFAULT_TIME = '00:00:00';

const isValidTimeString = (s: string) => /^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(s);

const toTimeString = (date: Date) => {
  return [date.getHours(), date.getMinutes(), date.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
};

/** Returns a new date with the calendar day of `date` and the time of day described by `time` (HH:MM or HH:MM:SS) */
const combineDateAndTime = (date: Date, time: string) => {
  const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(Number);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, seconds);
};

export type DateTimeFieldProps = Simplify<BaseFieldComponentProps<Date> & Omit<BaseFormField, 'kind'>>;

export const DateTimeField = ({
  description,
  disabled,
  error,
  label,
  name,
  readOnly,
  setValue,
  value
}: DateTimeFieldProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(value ? toTimeString(value) : DEFAULT_TIME);
  const { t } = useTranslation('libui');

  useEffect(() => {
    setTimeValue(value ? toTimeString(value) : DEFAULT_TIME);
  }, [value]);

  const dateInputId = `${name}-date`;
  const timeInputId = `${name}-time`;

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground text-xs" htmlFor={dateInputId}>
            {t('form.date')}
          </Label>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <Popover.Trigger asChild>
              <Button
                className="w-36 justify-between font-normal"
                data-testid="datetime-date-trigger"
                disabled={disabled || readOnly}
                id={dateInputId}
                type="button"
                variant="outline"
              >
                <span className={value ? undefined : 'text-muted-foreground'}>
                  {value ? toBasicISOString(value) : t('form.selectDate')}
                </span>
                <ChevronDownIcon className="text-muted-foreground size-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content asChild align="start" className="w-auto">
              <DatePicker
                onSelection={(date) => {
                  setValue(combineDateAndTime(date, isValidTimeString(timeValue) ? timeValue : DEFAULT_TIME));
                  setIsDatePickerOpen(false);
                }}
              />
            </Popover.Content>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground text-xs" htmlFor={timeInputId}>
            {t('form.time')}
          </Label>
          <Input
            autoComplete="off"
            className="bg-background w-32 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            data-testid="datetime-time-input"
            disabled={disabled || readOnly}
            id={timeInputId}
            name={name}
            step="1"
            type="time"
            value={timeValue}
            onChange={(event) => {
              const time = event.target.value;
              setTimeValue(time);
              if (value && isValidTimeString(time)) {
                setValue(combineDateAndTime(value, time));
              }
            }}
          />
        </div>
      </div>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
