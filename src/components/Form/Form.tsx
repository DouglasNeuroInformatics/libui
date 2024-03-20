import React, { useState } from 'react';

import type {
  FormContent,
  FormDataType,
  FormFields,
  PartialFormDataType,
  PartialNullableFormDataType
} from '@douglasneuroinformatics/libui-form-types';
import { set } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { ZodError, type ZodType } from 'zod';

import { Button } from '../Button';
import { Heading } from '../Heading';
import { ErrorMessage } from './ErrorMessage';
import { FieldsComponent } from './FieldsComponent';
import { getInitialValues } from './utils';

import type { FormErrors } from './types';

type FormProps<TData extends FormDataType> = {
  [key: `data-${string}`]: unknown;
  className?: string;
  content: FormContent<TData>;
  id?: string;
  initialValues?: PartialNullableFormDataType<TData>;
  onError?: (error: ZodError<TData>) => void;
  onSubmit: (data: TData) => void;
  resetBtn?: boolean;
  submitBtnLabel?: string;
  validationSchema: ZodType<TData>;
};

const Form = <TData extends FormDataType>({
  className,
  content,
  id,
  initialValues,
  onError,
  onSubmit,
  resetBtn,
  submitBtnLabel,
  validationSchema,
  ...props
}: FormProps<TData>) => {
  const { t } = useTranslation();
  const [rootError, setRootError] = useState<null | string>(null);
  const [errors, setErrors] = useState<FormErrors<TData>>({});
  const [values, setValues] = useState<PartialFormDataType<TData>>(
    initialValues ? getInitialValues(initialValues) : {}
  );

  const handleError = (error: ZodError<TData>) => {
    const fieldErrors: FormErrors<TData> = {};
    const rootErrors: string[] = [];
    for (const issue of error.issues) {
      if (issue.path.length > 0) {
        set(fieldErrors, issue.path, issue.message);
      } else {
        rootErrors.push(issue.message);
      }
    }
    setRootError(rootErrors.join('\n'));
    setErrors(fieldErrors);
    if (onError) {
      onError(error);
    }
  };

  const reset = () => {
    setRootError(null);
    setErrors({});
    setValues({});
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const result = validationSchema.safeParse(values);
    if (result.success) {
      reset();
      onSubmit(result.data);
    } else {
      console.error(result.error.issues);
      handleError(result.error);
    }
  };

  const isGrouped = Array.isArray(content);

  return (
    <form
      autoComplete="off"
      className={twMerge('my-8 w-full', isGrouped ? 'space-y-8 divide-y' : 'space-y-8', className)}
      id={id}
      onSubmit={handleSubmit}
      {...props}
    >
      {isGrouped ? (
        content.map((fieldGroup, i) => {
          return (
            <div className="space-y-8 [&:not(:first-child)]:pt-8" key={i}>
              <div>
                <Heading variant="h4">{fieldGroup.title}</Heading>
                {fieldGroup.description && (
                  <small className="text-sm italic text-muted-foreground">{fieldGroup.description}</small>
                )}
              </div>
              <FieldsComponent
                errors={errors}
                fields={fieldGroup.fields as FormFields<TData>}
                setErrors={setErrors}
                setValues={setValues}
                values={values}
              />
            </div>
          );
        })
      ) : (
        <FieldsComponent errors={errors} fields={content} setErrors={setErrors} setValues={setValues} values={values} />
      )}
      <div className="flex w-full gap-3">
        {/** Note - aria-label is used for testing in downstream packages */}
        <Button
          aria-label="Submit Button"
          className="block w-full"
          data-cy="submit-form"
          type="submit"
          variant="primary"
        >
          {submitBtnLabel ?? t('form.submit')}
        </Button>
        {resetBtn && (
          <Button aria-label="Reset Button" className="block w-full" type="button" variant="secondary" onClick={reset}>
            {t('form.reset')}
          </Button>
        )}
      </div>
      {rootError && <ErrorMessage error={rootError} />}
    </form>
  );
};

export { Form, type FormProps };
