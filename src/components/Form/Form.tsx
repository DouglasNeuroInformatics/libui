import { useEffect, useState } from 'react';

import type {
  FormContent,
  FormDataType,
  FormFields,
  PartialFormDataType,
  PartialNullableFormDataType
} from '@douglasneuroinformatics/libui-form-types';
import { get, set } from 'lodash-es';
import { twMerge } from 'tailwind-merge';
import type { Promisable } from 'type-fest';
import { z } from 'zod';

import { useTranslation } from '@/hooks';
import { cn } from '@/utils';

import { Button } from '../Button';
import { Heading } from '../Heading';
import { ErrorMessage } from './ErrorMessage';
import { FieldsComponent } from './FieldsComponent';
import { getInitialValues } from './utils';

import type { FormErrors } from './types';

type FormProps<TSchema extends z.ZodType<FormDataType>, TData extends z.TypeOf<TSchema> = z.TypeOf<TSchema>> = {
  [key: `data-${string}`]: unknown;
  additionalButtons?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  className?: string;
  content: FormContent<TData>;
  fieldsFooter?: React.ReactNode;
  id?: string;
  initialValues?: PartialNullableFormDataType<TData>;
  onError?: (error: z.ZodError<TData>) => void;
  onSubmit: (data: TData) => Promisable<void>;
  preventResetValuesOnReset?: boolean;
  readOnly?: boolean;
  resetBtn?: boolean;
  revalidateOnBlur?: boolean;
  submitBtnLabel?: string;
  suspendWhileSubmitting?: boolean;
  validationSchema: z.ZodType<TData>;
};

// eslint-disable-next-line max-lines-per-function
const Form = <TSchema extends z.ZodType<FormDataType>, TData extends z.TypeOf<TSchema> = z.TypeOf<TSchema>>({
  additionalButtons,
  className,
  content,
  fieldsFooter,
  id,
  initialValues,
  onError,
  onSubmit,
  preventResetValuesOnReset,
  readOnly,
  resetBtn,
  revalidateOnBlur,
  submitBtnLabel,
  suspendWhileSubmitting,
  validationSchema,
  ...props
}: FormProps<TSchema, TData>) => {
  const { resolvedLanguage, t } = useTranslation('libui');
  const [rootErrors, setRootErrors] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors<TData>>({});
  const [values, setValues] = useState<PartialFormDataType<TData>>(
    initialValues ? getInitialValues(initialValues) : {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleError = (error: z.ZodError<TData>) => {
    const fieldErrors: FormErrors<TData> = {};
    for (const issue of error.issues) {
      if (issue.path.length > 0) {
        const current = get(fieldErrors, issue.path) as string[] | undefined;
        if (current) {
          current.push(issue.message);
        } else {
          set(fieldErrors, issue.path, [issue.message]);
        }
      } else {
        setRootErrors((prevErrors) => [...prevErrors, issue.message]);
      }
    }
    setErrors(fieldErrors);
    if (onError) {
      onError(error);
    }
  };

  const reset = () => {
    setRootErrors([]);
    setErrors({});
    if (!preventResetValuesOnReset) {
      setValues({});
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const minSubmitTime = new Promise<void>((resolve) =>
      suspendWhileSubmitting ? setTimeout(resolve, 500) : resolve()
    );
    try {
      setIsSubmitting(true);
      event.preventDefault();
      const result = await validationSchema.safeParseAsync(values);
      if (result.success) {
        await onSubmit(result.data);
        reset();
      } else {
        console.error(result.error.issues);
        handleError(result.error);
      }
    } finally {
      await minSubmitTime;
      setIsSubmitting(false);
    }
  };

  const isGrouped = Array.isArray(content);

  const revalidate = () => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      validationSchema
        .safeParseAsync(values)
        .then((result) => {
          if (!result.success) {
            handleError(result.error);
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    revalidate();
  }, [resolvedLanguage]);

  const isSuspended = Boolean(suspendWhileSubmitting && isSubmitting);

  return (
    <form
      autoComplete="off"
      className={twMerge('w-full', isGrouped ? 'space-y-8 divide-y' : 'space-y-6', className)}
      id={id}
      onBlur={revalidateOnBlur ? revalidate : undefined}
      onSubmit={(event) => void handleSubmit(event)}
      {...props}
    >
      {isGrouped ? (
        content.map((fieldGroup, i) => {
          return (
            <div className="flex flex-col space-y-6 [&:not(:first-child)]:pt-8" key={i}>
              <div className="space-y-1">
                {fieldGroup.title && (
                  <Heading className="text-base" variant="h4">
                    {fieldGroup.title}
                  </Heading>
                )}
                {fieldGroup.description && (
                  <p className="text-sm italic leading-tight text-muted-foreground">{fieldGroup.description}</p>
                )}
              </div>
              <FieldsComponent
                errors={errors}
                fields={fieldGroup.fields as FormFields<TData>}
                readOnly={readOnly}
                setErrors={setErrors}
                setValues={setValues}
                values={values}
              />
            </div>
          );
        })
      ) : (
        <FieldsComponent
          errors={errors}
          fields={content}
          readOnly={readOnly}
          setErrors={setErrors}
          setValues={setValues}
          values={values}
        />
      )}
      {fieldsFooter}
      <div className="flex w-full gap-3">
        {additionalButtons?.left}
        {/** Note - aria-label is used for testing in downstream packages */}
        <Button
          aria-label="Submit"
          className="flex w-full items-center justify-center gap-2"
          disabled={readOnly || isSuspended}
          type="submit"
          variant="primary"
        >
          {submitBtnLabel ?? t('form.submit')}
          <svg
            className={cn('hidden h-4 w-4 animate-spin', isSuspended && 'block')}
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </Button>
        {resetBtn && (
          <Button
            aria-label="Reset"
            className="block w-full"
            disabled={readOnly}
            type="button"
            variant="secondary"
            onClick={reset}
          >
            {t('form.reset')}
          </Button>
        )}
        {additionalButtons?.right}
      </div>
      {Boolean(rootErrors.length) && <ErrorMessage error={rootErrors} />}
    </form>
  );
};

export { Form, type FormProps };
