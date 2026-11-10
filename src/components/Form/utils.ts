import type {
  FormContent,
  FormDataType,
  FormFields,
  PartialFormDataType,
  PartialNullableFormDataType,
  StaticFormFields,
  UnknownFormField
} from '@douglasneuroinformatics/libui-form-types';

function isEmptyScalarValue(value: unknown) {
  return value === undefined || value === null || value === '' || (value instanceof Set && value.size === 0);
}

export function getInitialValues<T extends FormDataType>(values: PartialNullableFormDataType<T>) {
  const initialValues: { [key: string]: unknown } = {};
  for (const key in values) {
    const value = values[key];
    if (value === null || value === undefined) {
      continue;
    } else if (Array.isArray(value)) {
      initialValues[key] = value.map(getInitialValues);
    } else {
      initialValues[key] = value;
    }
  }
  return initialValues as PartialFormDataType<T>;
}

/**
 * Returns the values to validate. A record array where every value of every record is empty (i.e.,
 * `undefined`, an empty string, or an empty set) is omitted, so the user can submit a record array
 * that they did not fill in if the validation schema marks it as optional. A record array where
 * at least one value is set is not changed, so the indices in validation errors continue to match the
 * records displayed to the user.
 */
export function getValuesToValidate<T extends FormDataType>(values: PartialFormDataType<T>): PartialFormDataType<T> {
  const result: { [key: string]: unknown } = {};
  for (const key in values) {
    const value: unknown = values[key];
    if (
      Array.isArray(value) &&
      value.every((record: { [key: string]: unknown }) => Object.values(record).every(isEmptyScalarValue))
    ) {
      continue;
    }
    result[key] = value;
  }
  return result as PartialFormDataType<T>;
}

/** Extract a flat array of form fields from the content. This function assumes there are no duplicate keys in groups  */
export function getFormFields<T extends FormDataType>(content: FormContent<T>): FormFields<T> {
  if (!Array.isArray(content)) {
    return content;
  }
  const groups = content.filter((item) => item.kind !== 'block');
  return groups.reduce((prev, current) => ({ ...prev, ...current.fields }), {}) as FormFields<T>;
}

/**
 * Given a set of data, resolve static content for form fields. Null values
 * will be removed.
 */
export function resolveStaticFormFields<T extends FormDataType>(content: FormContent<T>, data: PartialFormDataType<T>) {
  const staticFormFields: Partial<StaticFormFields<T>> = {};
  const formFields = getFormFields(content);
  for (const fieldName in formFields) {
    const field: UnknownFormField<T, typeof fieldName> = formFields[fieldName];
    if (field.kind === 'dynamic') {
      const resolvedField = field.render.call(undefined, data);
      if (resolvedField) {
        staticFormFields[fieldName] = resolvedField;
      }
    } else {
      staticFormFields[fieldName] = field;
    }
  }
  return staticFormFields;
}
