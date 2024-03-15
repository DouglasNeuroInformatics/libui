import { useEffect, useState } from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/libjs';
import type { DateFormField } from '@douglasneuroinformatics/libui-form-types';
import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';

import { DatePicker } from '../DatePicker/DatePicker';
import { FormFieldContainer } from './FormFieldContainer';
import { type BaseFieldComponentProps } from './types';

export type DateFieldProps = BaseFieldComponentProps<Date> & DateFormField;

export const DateField = ({ description, error, label, name, setValue, value }: DateFieldProps) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [mouseInDatePicker, setMouseInDatePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setShowDatePicker(inputFocused || mouseInDatePicker);
  }, [inputFocused, mouseInDatePicker]);

  const handleChange = (value: Date) => {
    setValue(value);
  };

  const handleDatePickerSelection = (date: Date) => {
    handleChange(date);
    setShowDatePicker(false);
  };

  const isFloatingLabel = showDatePicker || value;

  return (
    <FormFieldContainer description={description} error={error}>
      <input
        autoComplete="off"
        className="field-input"
        data-cy="date-input"
        value={value ? toBasicISOString(value) : ''}
        onBlur={() => {
          setInputFocused(false);
        }}
        y
        onChange={(event) => {
          if (!event.target.valueAsDate) {
            console.error(`Invalid value cannot be coerced to Date: ${event.target.value}`);
            return;
          }
          handleChange(event.target.valueAsDate);
        }}
        onFocus={() => {
          setInputFocused(true);
        }}
      />
      <label
        className={clsx('field-label-floating', {
          'field-label-floating--active': isFloatingLabel
        })}
        htmlFor={name}
      >
        {label}
      </label>
      <Transition
        className="relative z-10"
        enter="transition-opacity duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={showDatePicker}
      >
        <div className="absolute">
          <DatePicker
            onMouseEnter={() => {
              setMouseInDatePicker(true);
            }}
            onMouseLeave={() => {
              setMouseInDatePicker(false);
            }}
            onSelection={handleDatePickerSelection}
          />
        </div>
      </Transition>
    </FormFieldContainer>
  );
};
