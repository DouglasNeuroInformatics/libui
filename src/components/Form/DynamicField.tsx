import { useEffect, useMemo, useState } from 'react';

import type { DynamicFormField, FormDataType, PartialFormDataType } from '@douglasneuroinformatics/libui-form-types';
import { pick } from 'lodash-es';

import { StaticField } from './StaticField';

import type { FormErrors } from './types';

export type DynamicFieldProps<TData extends FormDataType> = {
  errors: FormErrors<TData>;
  field: DynamicFormField<TData>;
  name: string;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<TData>>>;
  setValues: React.Dispatch<React.SetStateAction<PartialFormDataType<TData>>>;
  values: PartialFormDataType<TData>;
};

export const DynamicField = <TData extends FormDataType>({
  field,
  name,
  values,
  ...props
}: DynamicFieldProps<TData>) => {
  const [dependentValues, setDependentValues] = useState(pick(values, field.deps));

  const staticField = useMemo(() => {
    return field.render(values);
  }, [dependentValues, field.render]);

  useEffect(() => {
    for (const key of field.deps) {
      if (dependentValues[key] !== values[key]) {
        setDependentValues(pick(values, field.deps));
        break;
      }
    }
  }, [field.deps, values]);

  if (!staticField) {
    return null;
  }

  return <StaticField {...props} field={staticField} name={name} values={values} />;
};
