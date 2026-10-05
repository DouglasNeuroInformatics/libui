import { useEffect, useState } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';

import type { BaseFormField } from '@douglasneuroinformatics/libui-form-types';
import { ChevronDownIcon } from 'lucide-react';
import type { Simplify } from 'type-fest';

import { Button, DatePicker, Input, Label, Popover } from '#components';
import { useTranslation } from '#hooks';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

const DEFAULT_TIME = '00:00:00';

const isValidTimeString = (s: string) => /^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(s);

const pad = (n: number) => String(n).padStart(2, '0');

const toTimeString = (date: Date) => {
  return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':');
};

/** Returns a new date with the calendar day of `date` and the time of day described by `time` (HH:MM or HH:MM:SS) */
const combineDateAndTime = (date: Date, time: string) => {
  const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(Number);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, seconds);
};

type TimeSegments = {
  hours: string;
  minutes: string;
  seconds: string;
};

const SEGMENT_MAX: { [K in keyof TimeSegments]: number } = { hours: 23, minutes: 59, seconds: 59 };

/** Strips non-digits from `input` and clamps it to the maximum for the segment, e.g., '60' -> '59' for minutes */
const sanitizeSegment = (key: keyof TimeSegments, input: string) => {
  const digits = input.replace(/\D/g, '').slice(0, 2);
  return digits && Number(digits) > SEGMENT_MAX[key] ? String(SEGMENT_MAX[key]) : digits;
};

/** Splits a 24-hour time string (HH:MM or HH:MM:SS) into its segments */
const toSegments = (time: string): TimeSegments => {
  const [h = 0, m = 0, s = 0] = (isValidTimeString(time) ? time : DEFAULT_TIME).split(':').map(Number);
  return { hours: pad(h), minutes: pad(m), seconds: pad(s) };
};

/** Converts segments back to a 24-hour time string (HH:MM:SS), or an empty string if any segment is invalid */
const fromSegments = ({ hours, minutes, seconds }: TimeSegments) => {
  if (![hours, minutes, seconds].every((segment) => /^\d{1,2}$/.test(segment))) {
    return '';
  }
  const [h, m, s] = [hours, minutes, seconds].map(Number) as [number, number, number];
  if (h > 23 || m > 59 || s > 59) {
    return '';
  }
  return [h, m, s].map(pad).join(':');
};

type SegmentedTimeInputProps = {
  disabled?: boolean;
  id: string;
  name: string;
  onChange: (time: string) => void;
  value: string;
};

/** A time input that always displays in 24-hour format, regardless of the browser locale */
const SegmentedTimeInput = ({ disabled, id, name, onChange, value }: SegmentedTimeInputProps) => {
  const [segments, setSegments] = useState(() => toSegments(value));
  const { t } = useTranslation('libui');

  // only resync from the value when it was changed externally, so partially typed segments are not overwritten
  useEffect(() => {
    if (fromSegments(segments) !== value) {
      setSegments(toSegments(value));
    }
  }, [value]);

  const update = (changes: Partial<TimeSegments>) => {
    const updated = { ...segments, ...changes };
    setSegments(updated);
    onChange(fromSegments(updated));
  };

  const segmentProps = (key: keyof TimeSegments) => ({
    'aria-label': t(`form.${key}`),
    className:
      'w-6 bg-transparent text-center tabular-nums outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed',
    'data-testid': `datetime-time-${key}`,
    disabled,
    inputMode: 'numeric' as const,
    maxLength: 2,
    onBlur: () => {
      if (/^\d$/.test(segments[key])) {
        setSegments({ ...segments, [key]: pad(Number(segments[key])) });
      }
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      update({ [key]: sanitizeSegment(key, event.target.value) });
    },
    onFocus: (event: FocusEvent<HTMLInputElement>) => event.target.select(),
    placeholder: '--',
    value: segments[key]
  });

  return (
    <div
      className="border-input focus-within:ring-ring flex h-9 items-center rounded-md border px-3 text-sm shadow-xs focus-within:ring-1 has-disabled:opacity-50"
      data-testid="datetime-time-input"
    >
      <input id={id} {...segmentProps('hours')} />
      <span className="text-muted-foreground">:</span>
      <input {...segmentProps('minutes')} />
      <span className="text-muted-foreground">:</span>
      <input {...segmentProps('seconds')} />
      <input name={name} type="hidden" value={value} />
    </div>
  );
};

export type DateTimeFieldProps = Simplify<
  BaseFieldComponentProps<Date> &
    Omit<BaseFormField, 'kind'> & {
      /** Force a 24-hour time display. If omitted, the native time input is used, which follows the browser locale. */
      timeFormat?: '24h';
    }
>;

export const DateTimeField = ({
  description,
  disabled,
  error,
  label,
  name,
  readOnly,
  setValue,
  timeFormat,
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

  const handleTimeChange = (time: string) => {
    setTimeValue(time);
    if (value && isValidTimeString(time)) {
      setValue(combineDateAndTime(value, time));
    }
  };

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
                  {value ? value.toDateString() : t('form.selectDate')}
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
          {timeFormat ? (
            <SegmentedTimeInput
              disabled={disabled || readOnly}
              id={timeInputId}
              name={name}
              value={timeValue}
              onChange={handleTimeChange}
            />
          ) : (
            <Input
              autoComplete="off"
              className="bg-background w-40 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              data-testid="datetime-time-input"
              disabled={disabled || readOnly}
              id={timeInputId}
              name={name}
              step="1"
              type="time"
              value={timeValue}
              onChange={(event) => handleTimeChange(event.target.value)}
            />
          )}
        </div>
      </div>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
