import { useEffect } from 'react';

import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label, Slider } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

/** Returns the position of a value on the slider track, as a percentage of the range from min to max */
const getPosition = (value: number, min: number, max: number) => {
  if (max <= min) {
    return 0;
  }
  return Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
};

export type NumberFieldSliderProps = Simplify<
  BaseFieldComponentProps<number> & Extract<NumberFormField, { variant: 'slider' }>
>;

export const NumberFieldSlider = ({
  defaultValue,
  description,
  disabled,
  error,
  label,
  marks,
  max,
  min,
  name,
  readOnly,
  setValue,
  showRange,
  value
}: NumberFieldSliderProps) => {
  // also applies after the form is reset, since the user cannot clear a slider
  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue, value]);

  const isUnset = value === undefined;
  const midpoint = min + Math.round((max - min) / 2);
  const markEntries = Object.entries(marks ?? {})
    .map(([key, text]) => [Number(key), text] as const)
    .filter(([markValue]) => markValue >= min && markValue <= max)
    .toSorted(([a], [b]) => a - b);

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <FieldGroup.Row>
        <Slider
          data-unset={isUnset ? '' : undefined}
          disabled={disabled || readOnly}
          max={max}
          min={min}
          name={name}
          value={[value ?? midpoint]}
          // without a value, the thumb is displayed at the midpoint, so a click on it does not change the
          // position and would not otherwise select that value
          onPointerDown={() => {
            if (isUnset) {
              setValue(midpoint);
            }
          }}
          onValueChange={([value]) => setValue(value)}
        />
        <span
          className="text-muted-foreground flex h-full w-8 items-center justify-center text-sm"
          data-testid="slider-value"
        >
          {value ?? 'NA'}
        </span>
      </FieldGroup.Row>
      {(showRange || markEntries.length > 0) && (
        // the horizontal padding matches half the width of the thumb, and the right margin matches the
        // width of the value plus the gap, so that 0% and 100% are the centers of the thumb at min and max
        <div
          className="text-muted-foreground -mt-2 mr-10 flex flex-col gap-1 px-2 text-xs"
          data-testid="slider-annotations"
        >
          {showRange && (
            <div className="flex justify-between" data-testid="slider-range">
              <span>{min}</span>
              <span>{max}</span>
            </div>
          )}
          {markEntries.length > 0 && (
            <div className="grid overflow-x-clip" data-testid="slider-marks">
              {markEntries.map(([markValue, text]) => {
                const position = getPosition(markValue, min, max);
                return (
                  <div className="col-start-1 row-start-1" key={markValue}>
                    <span
                      className="inline-block w-max max-w-[40%] leading-tight"
                      data-mark-value={markValue}
                      style={{
                        marginLeft: `${position}%`,
                        textAlign: position === 0 ? 'left' : position === 100 ? 'right' : 'center',
                        transform: `translateX(-${position}%)`
                      }}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
