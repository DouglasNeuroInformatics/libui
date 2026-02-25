import { useEffect, useRef, useState } from 'react';

import type { NumberFormField } from '@douglasneuroinformatics/libui-form-types';
import type { Simplify } from 'type-fest';

import { Label, RadioGroup } from '#components';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

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
  const [isColumnLayout, setIsColumnLayout] = useState<boolean>(false);
  const isColumnLayoutRef = useRef(isColumnLayout);

  const optionsCount = Object.keys(options).length;

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width: rootWidth } = entry!.target.getBoundingClientRect();
      const children = Array.from(entry!.target.children);
      const totalChildWidth = children.reduce((sum, child) => sum + child.scrollWidth, 0);
      const isOverflowing = totalChildWidth > rootWidth - children.length * 24; // to provide spacing between items
      setIsColumnLayout(isOverflowing);
      isColumnLayoutRef.current = isOverflowing;
    });
    if (radioGroupRef.current) {
      observer.observe(radioGroupRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <RadioGroup
        className="grid justify-between"
        name={name}
        ref={radioGroupRef}
        style={{
          gridTemplateColumns: isColumnLayout ? 'repeat(1, 1fr)' : `repeat(${optionsCount}, auto)`
        }}
        value={value?.toString() ?? ''}
        onValueChange={(value) => setValue(parseInt(value))}
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
