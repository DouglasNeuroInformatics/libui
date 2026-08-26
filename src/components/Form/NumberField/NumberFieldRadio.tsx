import { useEffect, useRef, useState } from 'react';

import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label, RadioGroup } from '#components';
import { cn } from '#utils';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

/**
 * The minimum number of options required to render the group horizontally. Below this, options are
 * stacked vertically, matching the other radio field variants, since spreading two or three options
 * across the full width of a wide container pushes them far apart and makes the later options easy
 * to miss.
 */
const MIN_OPTIONS_FOR_HORIZONTAL_LAYOUT = 4;

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
  const radioGroupRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  const optionsCount = Object.keys(options).length;
  const canUseHorizontalLayout = optionsCount >= MIN_OPTIONS_FOR_HORIZONTAL_LAYOUT;
  const isColumnLayout = !canUseHorizontalLayout || isOverflowing;

  useEffect(() => {
    if (!canUseHorizontalLayout || !radioGroupRef.current) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      const { width: rootWidth } = entry!.target.getBoundingClientRect();
      const children = Array.from(entry!.target.children);
      const totalChildWidth = children.reduce((sum, child) => sum + child.scrollWidth, 0);
      // subtract an allowance so that items always have some spacing between them
      setIsOverflowing(totalChildWidth > rootWidth - children.length * 24);
    });
    observer.observe(radioGroupRef.current);
    return () => observer.disconnect();
  }, [canUseHorizontalLayout]);

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        className={cn('grid', !isColumnLayout && 'justify-between')}
        name={name}
        ref={radioGroupRef}
        style={isColumnLayout ? undefined : { gridTemplateColumns: `repeat(${optionsCount}, auto)` }}
        value={value?.toString() ?? ''}
        onValueChange={(value) => setValue(parseInt(value, 10))}
      >
        {Object.keys(options)
          .map((val) => parseInt(val))
          .toSorted((a, b) => a - b)
          .map((val) => {
            return (
              <div className="flex w-fit items-center gap-2" key={val}>
                <RadioGroup.Item disabled={disabled || readOnly} id={`${name}-${val}`} value={val.toString()} />
                <Label
                  aria-disabled={disabled || readOnly}
                  className="text-muted-foreground flex items-center font-normal"
                  htmlFor={`${name}-${val}`}
                >
                  {!disableAutoPrefix && <span className="whitespace-nowrap">{val}&nbsp;-&nbsp;</span>}
                  <span>{options[val]}</span>
                </Label>
              </div>
            );
          })}
      </RadioGroup>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
