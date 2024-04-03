import type {
  FormContent,
  FormDataType,
  FormFields,
  PartialFormDataType,
  PartialNullableFormDataType,
  StaticFormFields,
  UnknownFormField
} from '@douglasneuroinformatics/libui-form-types';

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

/** Extract a flat array of form fields from the content. This function assumes there are no duplicate keys in groups  */
export function getFormFields<T extends FormDataType>(content: FormContent<T>): FormFields<T> {
  if (!Array.isArray(content)) {
    return content;
  }
  return content.reduce((prev, current) => ({ ...prev, ...current.fields }), content[0].fields) as FormFields<T>;
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
      const resolvedField = field.render(data);
      if (resolvedField) {
        staticFormFields[fieldName] = resolvedField;
      }
    } else {
      staticFormFields[fieldName] = field;
    }
  }
  return staticFormFields;
}
