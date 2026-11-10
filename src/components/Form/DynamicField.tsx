import { useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import * as React from 'react';

import type { DynamicFormField, FormDataType, PartialFormDataType } from '@douglasneuroinformatics/libui-form-types';
import { pick } from 'lodash-es';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { StaticField } from './StaticField.tsx';

import type { FormErrors } from './types.ts';

/**
 * The fields of a form are separated by a gap of 1.5rem (i.e., gap-6). A negative margin of the same
 * size removes the gap of a collapsed field, so the fields below it do not jump when it is added or removed.
 */
const COLLAPSED_MARGIN_TOP = '-1.5rem';

export type DynamicFieldProps<TData extends FormDataType> = {
  errors: FormErrors<TData>;
  field: DynamicFormField<TData>;
  name: string;
  readOnly?: boolean;
  setErrors: Dispatch<SetStateAction<FormErrors<TData>>>;
  setValues: Dispatch<SetStateAction<PartialFormDataType<TData>>>;
  values: PartialFormDataType<TData>;
};

export const DynamicField = <TData extends FormDataType>({
  field,
  name,
  readOnly,
  setValues,
  values,
  ...props
}: DynamicFieldProps<TData>) => {
  const [dependentValues, setDependentValues] = useState(pick(values, field.deps));

  const staticField = useMemo(() => {
    return field.render.call(undefined, values);
  }, [dependentValues, field.render]);

  useEffect(() => {
    if (!staticField) {
      setValues((prevValues) => ({ ...prevValues, [name]: undefined }));
    }
  }, [staticField]);

  useEffect(() => {
    for (const key of field.deps) {
      if (dependentValues[key] !== values[key]) {
        setDependentValues(pick(values, field.deps));
        break;
      }
    }
  }, [field.deps, values]);

  const shouldReduceMotion = useReducedMotion();
  const transition = { duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeInOut' } as const;
  const collapsed = { height: 0, marginTop: COLLAPSED_MARGIN_TOP, opacity: 0, overflow: 'hidden' } as const;

  // retained so that the field can still be rendered while it animates out
  const lastStaticFieldRef = useRef(staticField);
  if (staticField) {
    lastStaticFieldRef.current = staticField;
  }
  const displayedField = staticField ?? lastStaticFieldRef.current;

  return (
    <AnimatePresence initial={false}>
      {staticField && displayedField && (
        <motion.div
          animate={{
            height: 'auto',
            marginTop: 0,
            opacity: 1,
            // not clipped once displayed, so that focus rings are fully visible
            overflow: 'visible',
            pointerEvents: 'auto',
            transition: { ...transition, overflow: { delay: transition.duration, duration: 0 } }
          }}
          data-testid="dynamic-field"
          exit={{
            ...collapsed,
            pointerEvents: 'none',
            transition: { ...transition, overflow: { duration: 0 } }
          }}
          initial={collapsed}
          key={name}
        >
          <StaticField
            {...props}
            field={displayedField}
            name={name}
            readOnly={readOnly}
            setValues={setValues}
            values={values}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
